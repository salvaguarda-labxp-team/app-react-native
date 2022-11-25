import React, { useState, useEffect, useCallback } from "react";
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
} from "../definitions";
import { QuestionListTabView } from "../components/questionsList";

const QuestionsListScreen: React.FC<QuestionsListScreenProps> = ({
  navigation,
}) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      const user = AuthenticationAPI.getCurrentUser();
      if (user?.email != null && user?.email?.length > 0) {
        setQuestions(
          await QuestionsAPI.getUserQuestionsByStatus(user.email, "pending")
        );
      }
    };
    fetchData().catch(console.error);
  });
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

      setIsCQButtonDisabled(false);
      setModalVisible(false);
      setQuestionTitle("");
      setChosenSubject("");
      setDescription("");
    }
  };

  const onSubjectListItemPress = useCallback(
    (question: IQuestion) => {
      console.log(question.title)
      navigation.navigate("Chat", {
        roomId: question.rid,
        roomName: question.title,
      });
    },
    [navigation?.navigate]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.tab}
      >
        <Tab
          value={currentSubject}
          onChange={(e) => setCurrentSubject(e)}
          indicatorStyle={{
            backgroundColor: "white",
            height: 3,
          }}
          variant="primary"
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
              key={i}
            />
          ))}
        </Tab>
      </ScrollView>

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
      <QuestionListTabView
        {...{
          currentSubject,
          onListItemPress: onSubjectListItemPress,
          setCurrentSubject,
          questions,
        }}
      />
      <FAB
        testID="add-question"
        icon={{ name: "add", color: "white" }}
        placement="right"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

export default QuestionsListScreen;

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    height: "100%",
    maxHeight: 60,
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
    backgroundColor: "#2196F3",
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
