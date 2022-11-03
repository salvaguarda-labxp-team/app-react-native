import { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, View, StyleSheet, Modal, Pressable } from "react-native";
import { Input, ButtonGroup, FAB} from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  centeredView: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: { 
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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
  modalText: { 
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  container: { 
    alignItems: "center",
    paddingVertical: 5,
    flexGrow: 1,
  },
});

export default function QuestionsListScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [dropDrownExpanded, setDropDownExpanded] = useState(false);
  const [chosenSubject, setChosenSubject] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState([
    { label: "Matemática", value: "Math" },
    { label: "Português", value: "Port" },
    { label: "Geografia", value: "Geo" },
    { label: "Biologia", value: "Bio" },
    { label: "Química", value: "Chem" },
    { label: "História", value: "Hist"},
    { label: "Filosofia", value: "Philo"},
    { label: "Sociologia", value: "Socio"},
    { label: "Física", value: "Phys"},
    { label: "Artes", value: "Arts"}
  ])

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>Enviar dúvida</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View> 
  );
}
