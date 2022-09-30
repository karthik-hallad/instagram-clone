import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {USER_STATE_CHANGE} from "../constants";

export default function fetchUser() {
  return (dispatch) => {
    //as react-thunk is used we pas in dispatch and whenever we call dispatch(fn)
    //it acts like the last method  of the redux life cycle

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        // console.log(firebase.auth().currentUser.uid);
        // console.log(snapshot.data());
        // console.log(snapshot.exists);
        if (snapshot.exists) {
          //passing in disapatch with some data and some date // type to use afterward
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
        } else {
          console.log("Snapshot does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
