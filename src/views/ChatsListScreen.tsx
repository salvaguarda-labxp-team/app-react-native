import { StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { ListItem , Avatar } from "react-native-elements";
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { onAuthStateChanged } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

import { AuthenticationAPI, RoomsAPI } from "../lib/services";
import { ChatsListScreenProps, IRoom } from "../definitions";
import { auth } from "../lib/utils/firebase";
import FirebaseUsersAPI from "../lib/services/FirebaseUsersAPI";

const ChatsListScreen = ({ navigation }: ChatsListScreenProps) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = AuthenticationAPI.getCurrentUser();
      setTimeout(async () => {
        if ((user != null) && user.email) {
          setRooms(await RoomsAPI.getUserRooms(user.email));
        }
      }, 2000);
    };

    fetchData().catch(console.error);
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user == null) {
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
      <ScrollView style={styles.scrollView}>
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
      </ScrollView>
    </View>
  );
};

export default ChatsListScreen;

const styles = StyleSheet.create({
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
  scrollView: {
    width: "100%",
  },
});
