import React, { useContext, useState, useEffect } from "react";
import { firebaseDB } from "../helpers/firebase";

// Creating context for global data
const BlogContext = React.createContext();

// Defining a function to get data from BlogContext
export function useBlog() {
  return useContext(BlogContext);
}

export function BlogProvider({ children }) {
  const [currentBlogs, setCurrentBlogs] = useState();

  function addBlog(blogValue) {
    const blogRef = firebaseDB.ref("blogs");
    blogRef.push(blogValue);
  }

  function getOneBlog(id) {
    const result = currentBlogs?.filter((item) => item.id === id);
    return result;
  }

  function deleteOneBlog(id) {
    const contactRef = firebaseDB.ref("blogs").child(id);
    contactRef.remove();
  }

  function updateBlog(id, data) {
    const contactRef = firebaseDB.ref("blogs").child(id);
    contactRef.update(data);
  }

  useEffect(() => {
    const blogRef = firebaseDB.ref("blogs");
    blogRef.on("value", (snapshot) => {
      //console.log(snapshot.val());
      const blogs = snapshot.val();
      const blogL = [];
      for (let id in blogs) {
        blogL.push({ id, ...blogs[id] });
      }

      setCurrentBlogs(blogL);
    });
  }, []);

  const value = {
    addBlog,
    currentBlogs,
    getOneBlog,
    deleteOneBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
