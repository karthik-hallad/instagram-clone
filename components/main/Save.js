import React, {useState} from "react";
import {View, Image, Text, TextInput, Button} from "react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//vvv imp to pas data that we get from the add into props
export default function Save(props) {
  const [caption, setCaption] = useState("");
  const image = props.route.params.image;

  const savePicture = async () => {
    console.log(image);
    const response = await fetch(image);
    const blob = await response.blob();
    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);

    //process of uploading //complete debugging phase
    const taskProgress = (snapshot) => {
      console.log(`Transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = async (imageuri) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        imageurl: imageuri,
        caption: caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        props.navigation.popToTop();
      });
  };
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <Image source={{uri: image}} />
      <TextInput
        placeholder="Write a Caption... "
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={savePicture} />
    </View>
  );
}
