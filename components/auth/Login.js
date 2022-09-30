import React, {Component} from "react";
import {TextInput, View, Button} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onSignIn() {
    //console.log("ads");
    const {email, password} = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({email: email})}
        />

        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password: password})}
        />

        <Button title="Sign In" onPress={() => this.onSignIn()} />
      </View>
    );
  }
}

export default Login;
