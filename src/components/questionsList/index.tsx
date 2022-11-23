import React, { Dispatch, SetStateAction, useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  GestureResponderEvent,
  View,
} from "react-native";
import { ListItem, TabView } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { IQuestion, SubjectsList, subjectsMap } from "../../definitions";

export const SubjectQuestionList: React.FC<{
  questions: IQuestion[];
  onListItemPress: (question: IQuestion) => void;
}> = ({ questions, onListItemPress }) => {
  const handleQuestionList = useMemo(
    () =>
      questions.map((q, i) => {
        return (
          <ListItem
            key={i}
            bottomDivider
            hasTVPreferredFocus={false}
            tvParallaxProperties={false}
            style={styles.listItem}
            onPress={() => onListItemPress(q)}
          >
            <MaterialIcons name="person-outline" />
            <ListItem.Content>
              <ListItem.Title>{q.title}</ListItem.Title>
              <ListItem.Subtitle>{q.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      }),
    [questions, onListItemPress]
  );
  return (
    <TabView.Item style={{ backgroundColor: "red", width: "100%" }}>
      <ScrollView style={styles.scrollView}>{handleQuestionList}</ScrollView>
    </TabView.Item>
  );
};

export const QuestionListTabView: React.FC<{
  questions: IQuestion[];
  onListItemPress: (question: IQuestion) => void;
  currentSubject: number;
  setCurrentSubject: Dispatch<SetStateAction<number>>;
}> = ({ questions, onListItemPress, currentSubject, setCurrentSubject }) => {
  const handleSubjectsLists = useMemo(
    () =>
      SubjectsList.map((v, k) => (
        <SubjectQuestionList
          onListItemPress={onListItemPress}
          questions={questions.filter(
            (q) => subjectsMap[q.subject].name === v.name
          )}
          key={k}
        />
      )),
    [questions, onListItemPress]
  );
  return (
    <View style={styles.tabView}>
      <TabView
        value={currentSubject}
        onChange={setCurrentSubject}
        animationType="spring"
      >
        {handleSubjectsLists}
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    height: "100%",
    maxHeight: 60,
  },
  tabView: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
  listItem: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
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
