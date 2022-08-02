const EditReducer = (state, action) => {
  switch (action.type) {
    case "CLICKED":
      return {
        isClicked: true,
        id: action.payload,
      };
    case "UNCLICKED":
      return {
        isClicked: false,
        id: null,
      };
    default:
      return { ...state };
  }
};

export default EditReducer;
