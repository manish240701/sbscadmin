//dependencies
import { EditContext } from "../../Context/EditContext";
import { useContext } from "react";

//components
import addbtn from "../assets/addbutton.png";

//css
import "./AddButton.css";

//code
const AddButton = () => {
  //states
  const { dispatch } = useContext(EditContext);

  //changehandler

  const changeHandler = () => {
    dispatch({ type: "UNCLICKED" });
  };

  return (
    <div className="global-add-btn-container">
      <img
        onClick={changeHandler}
        src={addbtn}
        alt="add-btn"
        width="80px"
        className="admin-add-btn"
      />
    </div>
  );
};

export default AddButton;
