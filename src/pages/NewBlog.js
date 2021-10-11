import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BlogForm from "../components/BlogForm";
import { useHistory } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";
import { toastSuccessNotify } from "../helpers/ToastNotify";

const NewBlog = () => {
  const { currentUser } = useAuth();
  const [newBlog, setNewBlog] = useState({
    author: currentUser.email,
    title: "",
    content: "",
    image: "",
    published_date: Date.now(),
  });
  const { addBlog } = useBlog();
  const history = useHistory();

  const newBlogHandler = (e) => {
    e.preventDefault();
    try {
      addBlog(newBlog);
      history.push("/");
      toastSuccessNotify("Blog added successfully!");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div style={{ marginTop: 90 }}>
      <BlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        newBlogHandler={newBlogHandler}
      />
    </div>
  );
};

export default NewBlog;
