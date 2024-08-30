import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import { ApiServices } from "./api/api_services";

const PostPage = () => {
  const { handleDelete } = useContext(DataContext)
  const [post, setPost] = useState({})
  const { id } = useParams();
  const getData = (id) => {
    ApiServices.postGetById(id).then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        setPost(res.posts)
      }
    })
  }
  useEffect(() => {
    getData(id)
  }, [])

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{new Date(post.datetime).toString().slice(0, 25)}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post._id}`}><button className="editButton">Edit Post</button></Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post._id)}
            >
              DeletePost
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well That's Disappointing</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
