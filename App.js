import {StatusBar} from "expo-status-bar";
import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import firebase from "firebase/compat/app";

//redux
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

//screens
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";

const firebaseConfig = {
  apiKey: "AIzaSyAsDE6E6ZfUQjEbj3qaAMzwp725atgRWFQ",
  authDomain: "instagram-clone-caa17.firebaseapp.com",
  projectId: "instagram-clone-caa17",
  storageBucket: "instagram-clone-caa17.appspot.com",
  messagingSenderId: "20849528250",
  appId: "1:20849528250:web:65d9432c65eb899c1ca183",
  measurementId: "G-TNZ2TYFLSY",
};

if (firebase.apps.length == 0) {
  const app = firebase.initializeApp(firebaseConfig);
}
const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //loaded is flase when the render function is not called yet
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      //to check if there was a change in logged state or no and set in loggedIn function accordingly
      if (!user) {
        this.setState({loaded: true, loggedIn: false});
      } else {
        this.setState({loaded: true, loggedIn: true});
      }
    });
  }

  render() {
    const {loaded, loggedIn} = this.state;
    if (!loaded) {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text>Loading.........</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          {/* //mention all the route names in the app.js file for stack navigation */}
          <Stack.Navigator intialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator intialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{headerShown: true}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
