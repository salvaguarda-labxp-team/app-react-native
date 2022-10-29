import {
  Alert,
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem, FAB, Input, ButtonGroup } from "react-native-elements";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { onAuthStateChanged } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { AuthenticationAPI, RoomsAPI } from "../lib/services";
import { ChatsListScreenProps, IRoom } from "../definitions";
import { auth } from "../lib/utils/firebase";
import { UsersAPI } from "../lib/services/UsersAPI";

const ChatsListScreen = ({ navigation }: ChatsListScreenProps) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [question, setQuestion] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [chosenSubjects, setChosenSubjects] = useState([]);
  const [subjects, setSubjects] = useState([
    { label: "Matemática", value: "Math" },
    { label: "Matemática Financeira", value: "mat-fin", parent: "Math" },
    { label: "Trigonometria", value: "trig", parent: "Math" },

    { label: "Português", value: "Port" },
    { label: "Geografia", value: "Geo" },
    { label: "Biologia", value: "Bio" },
    { label: "Química", value: "Chem" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const user = AuthenticationAPI.getCurrentUser();
      setTimeout(async () => {
        if (user && user.email) {
          setRooms(await RoomsAPI.getUserRooms(user.email));
        }
      }, 2000);
    };

    fetchData().catch(console.error);
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.replace("Login");
      }
    });
  }, []);

  const signOut = async () => {
    await AuthenticationAPI.signOut();
  };

  const openChat = (roomId: string, roomName: string) => {
    navigation.navigate("Chat", {
      roomId,
      roomName,
    });
  };

  const createRoom = async () => {
    const invitedUser = await UsersAPI.getUserByEmail(username);
    const currentUser = AuthenticationAPI.getCurrentUser();
    if (invitedUser && currentUser && chosenSubjects.length) {
      const roomType = type ? "private" : "public";
      await RoomsAPI.createRoom(
        question,
        chosenSubjects[0],
        roomType,
        currentUser.email!!,
        [username]
      );
    }
    setModalVisible(!modalVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Avatar
            rounded
            source={{
              uri:
                AuthenticationAPI.getCurrentUser()?.photoURL ||
                AuthenticationAPI.defaultPhotoURL,
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 30,
          }}
          onPress={signOut}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

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
              value={question}
              onChangeText={setQuestion}
              placeholder="Dúvida"
              leftIcon={<MaterialIcons name="help" size={24} color="black" />}
              autoCompleteType="none"
            />

            <ButtonGroup
              buttons={["Público", "Privado"]}
              selectedIndex={type}
              onPress={setType}
              containerStyle={{ marginBottom: 20 }}
            />

            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              leftIcon={<MaterialIcons name="mail" size={24} color="black" />}
              autoCompleteType="mail"
            />

            <DropDownPicker
              placeholder="Matéria"
              open={open}
              value={chosenSubjects}
              items={subjects}
              setOpen={setOpen}
              setValue={setChosenSubjects}
              setItems={setSubjects}
              multiple={true}
              mode="BADGE"
              badgeDotColors={[
                "#e76f51",
                "#00b4d8",
                "#e9c46a",
                "#e76f51",
                "#8ac926",
                "#00b4d8",
                "#e9c46a",
              ]}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={createRoom}
            >
              <Text style={styles.textStyle}>Criar chat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {rooms.map((item, i) => (
        <ListItem
          key={i}
          bottomDivider
          hasTVPreferredFocus={false}
          tvParallaxProperties={false}
          style={styles.listItem}
          onPress={() => openChat(item._id, item.name)}
        >
          <MaterialIcons name="person-outline" />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}

      <FAB
        icon={{ name: "add", color: "white" }}
        placement="right"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

export default ChatsListScreen;

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
  listItem: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  button: {
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
