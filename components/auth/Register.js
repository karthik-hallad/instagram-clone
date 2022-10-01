import React, {Component} from "react";
import {TextInput, View, Button} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };

    //by def can access onsignup func only in render
    this.onSignup = this.onSignup.bind(this);
  }

  onSignup() {
    const {email, password, name} = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
            id: firebase.auth().currentUser.uid,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({name: name})}
        />

        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({email: email})}
        />

        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password: password})}
        />

        <Button title="Sign Up" onPress={() => this.onSignup()} />
      </View>
    );
  }
}

export default Register;
