const intialState = {
  currentUser: null,
};

let user = (state = intialState, action) => {
  return {
    //get the intial state and then update it with the state recieved from action
    //so if action.currentUser exists currentUser is updated else it is set to null
    //defiend by ...
    ...state,
    currentUser: action.currentUser,
  };
};

export default user;
