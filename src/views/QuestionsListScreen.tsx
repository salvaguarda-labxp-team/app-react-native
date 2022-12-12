import React, { useState, useEffect, useCallback, useMemo } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Input, FAB } from "react-native-elements";
import { Tab } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthenticationAPI, QuestionsAPI } from "../lib/services";
import {
  IQuestion,
  SubjectsList,
  IQuestionSubject,
  QuestionsListScreenProps,
  IUser,
} from "../definitions";
import {
  QuestionListTabView,
  SubjectQuestionList,
} from "../components/questionsList";
import { LocalStorageProvider } from "../lib/utils/storage";
import { SubscriptionsAPI } from "../lib/services/SubscriptionsAPI";

const QuestionsListScreen: React.FC<QuestionsListScreenProps> = ({
  navigation,
  route,
}) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [description, setDescription] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [isCQButtonDisabled, setIsCQButtonDisabled] = useState<boolean>(false);
  const [dropDrownExpanded, setDropDownExpanded] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(0);
  const [chosenSubject, setChosenSubject] = useState<IQuestionSubject | "">("");
  const [availableSubjects, setAvailableSubjects] = useState([
    { label: "Matemática", value: "Math" },
    { label: "Português", value: "Port" },
    { label: "Geografia", value: "Geo" },
    { label: "Biologia", value: "Bio" },
    { label: "Química", value: "Chem" },
    { label: "História", value: "Hist" },
    { label: "Filosofia", value: "Philo" },
    { label: "Sociologia", value: "Socio" },
    { label: "Física", value: "Phys" },
    { label: "Artes", value: "Arts" },
  ]);
  const storage = new LocalStorageProvider();
  const { status } = route.params;

  const fetchData = async () => {
    const user: IUser | null =
      (await storage.get("user")) ||
      (await AuthenticationAPI.getCurrentUserFromDB());
    if (user && user?.email != null && user?.email?.length > 0) {
      setUser(user);
      console.log(user);
      setQuestions(
        user.role === "monitor" && user.subject
          ? await QuestionsAPI.getQuestionsByStatusAndSubject(
              status,
              user.subject
            )
          : await QuestionsAPI.getUserQuestionsByStatus(user.email, status)
      );
    }
  };

  const updateList = () => {
    fetchData().catch(console.error);
  };

  useEffect(() => {
    updateList();
  }, []);
  const createQuestion = async () => {
    const currentUser = AuthenticationAPI.getCurrentUser();
    if (
      currentUser != null &&
      chosenSubject !== "" &&
      description &&
      questionTitle &&
      currentUser.email
    ) {
      try {
        setIsCQButtonDisabled(true);
        await QuestionsAPI.createQuestion(
          questionTitle,
          description,
          chosenSubject,
          currentUser.email
        );
      } catch (e: any) {
        console.log(e);
      }

      fetchData().catch(console.error);
      setIsCQButtonDisabled(false);
      setModalVisible(false);
      setQuestionTitle("");
      setChosenSubject("");
      setDescription("");
    }
  };

  const onQuestionPress = useCallback(
    async (question: IQuestion) => {
      if (user && user.role === "monitor" && question.status === "pending") {
        await SubscriptionsAPI.addSubscription(user._id, question.rid);
        await QuestionsAPI.updateQuestionStatusById(
          question._id,
          "in_progress"
        );
      }
      navigation.navigate("Chat", {
        roomId: question.rid,
        roomName: question.title,
      });
    },
    [navigation?.navigate, user]
  );

  return (
    <View style={styles.container}>
      {user && user.role === "student" ? (
        <>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollTab}
          >
            <Tab
              value={currentSubject}
              onChange={(e) => setCurrentSubject(e)}
              variant="primary"
              disableIndicator={true}
            >
              {SubjectsList.map((v, i) => (
                <Tab.Item
                  title={v.name}
                  titleStyle={{ fontSize: 12 }}
                  icon={{
                    name: v.icon,
                    type: "material",
                    color: "white",
                  }}
                  buttonStyle={(active) => ({
                    backgroundColor: active ? "#8f63aa" : "#6d388c",
                  })}
                  key={i}
                />
              ))}
            </Tab>
          </ScrollView>
          <QuestionListTabView
            {...{
              currentSubject,
              onListItemPress: onQuestionPress,
              setCurrentSubject,
              questions,
              onListRefresh: updateList,
              user,
            }}
          />
          <FAB
            testID="add-question"
            icon={{ name: "add", color: "white" }}
            placement="right"
            onPress={() => setModalVisible(!modalVisible)}
            buttonStyle={styles.fab}
          />
        </>
      ) : (
        <>
          <SubjectQuestionList
            questions={questions}
            onListItemPress={onQuestionPress}
            onListRefresh={updateList}
          />
        </>
      )}

      <Modal
        testID="question-modal"
        avoidKeyboard={true}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalWindow}>
          <Text style={styles.modalText}>Criação de Chat</Text>

          <Input
            value={questionTitle}
            onChangeText={setQuestionTitle}
            placeholder="Descreva sua dúvida em uma frase"
            leftIcon={<MaterialIcons name="help" size={24} color="black" />}
            autoCompleteType="none"
          />

          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva detalhadamente sua dúvida"
            multiline={true}
            leftIcon={<MaterialIcons name="mail" size={24} color="black" />}
            autoCompleteType="none"
          />

          <DropDownPicker
            placeholder="Matéria"
            open={dropDrownExpanded}
            value={chosenSubject}
            items={availableSubjects}
            setOpen={setDropDownExpanded}
            setValue={setChosenSubject}
            setItems={setAvailableSubjects}
          />

          <Pressable
            style={[
              styles.button,
              styles.buttonClose,
              ...(isCQButtonDisabled ? [styles.buttonCloseDisabled] : []),
            ]}
            onPress={createQuestion}
            disabled={isCQButtonDisabled}
          >
            <Text style={styles.textStyle}>Enviar dúvida</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default QuestionsListScreen;

const styles = StyleSheet.create({
  scrollTab: {
    flexGrow: 1,
    height: "100%",
    maxHeight: 60,
    backgroundColor: "#6d388c",
  },
  fab: {
    backgroundColor: "#ea5b1c",
    color: "#ea5b1c",
  },
  modalWindow: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#ea5b1c",
  },
  buttonCloseDisabled: {
    opacity: 0.4,
  },
  modalText: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingVertical: 5,
    flexGrow: 1,
    height: "100%",
    width: "100%",
  },
});
