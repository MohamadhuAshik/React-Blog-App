import { createContext, useEffect, useState } from "react";
import useWindowSize from "../Hooks/useWindowSize";
// import useAxiosFetch from "../Hooks/useAxiosFetch";
// import { format } from "date-fns";
import { ApiServices } from "../api/api_services";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  /* const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:6969/posts/get"

  ); */

  const getPostData = () => {
    setIsLoading(true)
    ApiServices.getPost().then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        setPosts(res.posts)
      }
      setIsLoading(false)
    })
  }
  useEffect(() => {
    getPostData()
  }, []);

  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")
  }
  console.log("token", token)
  useEffect(() => {
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [token])
  console.log("isLogin", isLogin)

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults.reverse());
  }, [posts, search]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title: postTitle, body: postBody };
    ApiServices.createPost(newPost).then((res) => {
      console.log(res)
      if (res.response_code === 200) {
        setPostTitle("");
        setPostBody("");
        navigate("/");
        getPostData()
      }
    })

  };


  const handleDelete = async (id) => {

    ApiServices.deletePost(id).then((res) => {
      if (res.response_code === 200) {
        navigate("/");
        getPostData()
      }
    })

  };


  const handleEdit = async (id) => {
    const updatePost = { title: editTitle, body: editBody };
    ApiServices.editPost(id, updatePost).then((res) => {
      if (res.response_code === 200) {
        setEditTitle("");
        setEditBody("");
        navigate("/");
        getPostData()
      }

    })

  };

  return (
    <DataContext.Provider value={{
      isLogin, setIsLogin, width, search, setSearch, searchResults,/*  fetchError, */  isLoading, handleSubmit, postTitle, setPostTitle, postBody, setPostBody, posts, editTitle, editBody, setEditTitle, setEditBody, handleEdit, handleDelete, height
    }}>
      {children}
    </DataContext.Provider>
  )
}
export default DataContext