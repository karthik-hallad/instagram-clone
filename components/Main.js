import React, {Component} from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import fetchUser from "../redux/actions";
import {View, Button, Text} from "react-native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

//vicons package
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//screens
import FeedScreen from "./main/Feed";
import AddScreen from "./main/Add";
import ProfileScreen from "./main/Profile";
import EmptyComponent from "./main/EmptyComponent";

class Main extends Component {
  componentDidMount() {
    //best to make ajax api calls
    //now stored in props.user
    //when this is called action fetchuser called -> dispatch called ->
    //userState called which is the default reducer which has a state var currenUser
    // currently set to null afterwhich we can simply update the var and continue the cycle
    this.props.fetchUser();
  }

  render() {
    const {currentUser} = this.props;
    if (currentUser == null) {
      return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Add "
          component={EmptyComponent}
          // to prevent the tab press that occurs
          listeners={({navigation}) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

//boilerplate bind react-porps to redux
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchUser}, dispatch);
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  //to access currenUser as per the UserState
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
