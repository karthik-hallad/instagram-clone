import React, {Component} from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import fetchUser from "../redux/actions";
import {View, Button, Text} from "react-native";

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
      return <h1>Unkown error</h1>;
    }
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <h1>Successfully Logged in</h1>
        <h2>{currentUser.name} , Welcome to Instagram!!</h2>
      </View>
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
