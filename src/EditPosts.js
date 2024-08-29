import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import { ApiServices } from "./api/api_services";

const EditPosts = () => {
  const { editTitle, editBody, setEditTitle, setEditBody, handleEdit } =
    useContext(DataContext);
  const { id } = useParams();
  const getData = (id) => {
    ApiServices.postGetById(id).then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        setEditTitle(res.posts.title);
        setEditBody(res.posts.body);
      }
    })
  }
  useEffect(() => {
    getData(id)
  }, [])

  // const post = posts.find((post) => post.id.toString() === id);
  // useEffect(() => {
  //   if (post) {
  //     setEditTitle(post.title);
  //     setEditBody(post.body);
  //   }
  // }, [post, setEditBody, setEditTitle]);


  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>EditPost</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well That's Disappointing</p>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPosts;
