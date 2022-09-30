import React from "react";
import {View, Text, Button} from "react-native";

export default function Landing({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Button
        className="btn btn-success bt-lg"
        title="Register Now"
        // if arrow function not used called when it is rendered
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
