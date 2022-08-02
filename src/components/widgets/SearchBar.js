//css
import "./SearchBar.css";

//code
const SearchBar = ({ searchid, searchname, placeholder, setValue }) => {

  //setvaluehandler
  const valueHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    //searchbar
    <div className="global-search-bar-container">
      <input
        type="text"
        onChange={valueHandler}
        id={searchid}
        name={searchname}
        className="global-search-bar"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
