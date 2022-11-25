import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { StyleSheet, View, RefreshControl, Pressable } from "react-native";
import { Text, ListItem } from "react-native-elements";
import { TabView } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { IQuestion, SubjectsList, subjectsMap } from "../../definitions";
import stringToColor from "string-to-color";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { wait, truncateString } from "../../lib/utils";

export const QuestionItem: React.FC<{
  question: IQuestion;
  onListItemPress: (question: IQuestion) => void;
}> = ({ question, onListItemPress }) => {
  return (
    <Pressable
      style={styles.listItem}
      onPress={() => onListItemPress(question)}
    >
      <View
        style={{
          ...styles.rectangleShape,
          backgroundColor: stringToColor(question._id),
        }}
      />
      <View style={styles.listItemContent}>
        <View style={styles.listItemInfo}>
          <ListItem.Title style={styles.title}>{question.title}</ListItem.Title>
          <View style={styles.labelRow}>
            <MaterialIcons name="edit" size={12} color="black" />
            <Text style={styles.labelText}>
              {question.createdAt.toLocaleDateString()} -{" "}
              {question.createdAt.toLocaleTimeString()}
            </Text>
          </View>

          <View style={styles.labelRow}>
            <MaterialIcons name="notes" size={12} color="black" />
            <Text style={styles.labelText}>
              {truncateString(question.description, 100)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export const SubjectQuestionList: React.FC<{
  questions: IQuestion[];
  onListItemPress: (question: IQuestion) => void;
  onListRefresh: () => void;
}> = ({ questions, onListItemPress, onListRefresh }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onListRefresh();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <TabView.Item style={styles.tabViewItem}>
      <SafeAreaView style={styles.scrollView}>
        <FlatList
          style={styles.questionsList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={questions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <QuestionItem question={item} onListItemPress={onListItemPress} />
          )}
        />
      </SafeAreaView>
    </TabView.Item>
  );
};

export const QuestionListTabView: React.FC<{
  questions: IQuestion[];
  onListItemPress: (question: IQuestion) => void;
  currentSubject: number;
  setCurrentSubject: Dispatch<SetStateAction<number>>;
  onListRefresh: () => void;
}> = ({
  questions,
  onListItemPress,
  currentSubject,
  setCurrentSubject,
  onListRefresh,
}) => {
  const handleSubjectsLists = useMemo(
    () =>
      SubjectsList.map((v, k) => (
        <SubjectQuestionList
          onListItemPress={onListItemPress}
          questions={questions.filter(
            (q) => subjectsMap[q.subject].name === v.name
          )}
          onListRefresh={onListRefresh}
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
        disableSwipe={true}
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
  tabViewItem: {
    width: "100%",
  },
  listItem: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    paddingLeft: 0,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    width: "100%",
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
  questionsList: {
    height: "100%",
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    margin: 5,
  },
  labelRow: {
    fontWeight: "bold",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    marginLeft: 5,
  },
  listItemContent: {
    flexDirection: "row",
    margin: 5,
  },
  listItemInfo: {
    flexDirection: "column",
  },
  rectangleShape: {
    width: "5%",
    height: "100%",
  },
});
