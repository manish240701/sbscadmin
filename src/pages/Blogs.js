//container
import BlogsIndividualContainer from "../components/widgets/Blogs/BlogsIndividualContainer";
import AddButton from "../components/widgets/AddButton";
import Modal from "../components/widgets/Modal";

//css
import "./css/Blogs.css";

//code
const Blogs = () => {
  return (
    <div className="blogs-container">
      {/* blogs-row */}
      <div className="blogs-container-row">
        <BlogsIndividualContainer />
      </div>

      {/* modal */}
      <Modal />
      <div
        className="global-add-btn"
        data-toggle="modal"
        data-target="#modal-fullscreen-xl"
        data-bs-toggle="modal"
        data-bs-target="#addEditModal"
      >
        <AddButton />
      </div>
    </div>
  );
};

export default Blogs;
