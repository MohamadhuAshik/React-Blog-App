import { createContext,useEffect,useState } from "react";
import useWindowSize from "../Hooks/useWindowSize";
import useAxiosFetch from "../Hooks/useAxiosFetch";
import { format } from "date-fns";
import api from "../api/posts";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({})

export const DataProvider = ({children})=>{
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch(
      "http://localhost:3500/posts"
    );
  
    
    useEffect(() => {
      setPosts(data);
    }, [data]);
  

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
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), `MMM dd, yyyy pp`);
      const newPost = { id, title: postTitle, datetime, body: postBody };
      try {
        const response = await api.post("/posts", newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
        navigate("/");
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error:${err.stack}`);
        }
      }
    };
  

    const handleDelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        const postsLists = posts.filter((post) => post.id !== id);
        setPosts(postsLists);
        navigate("/");
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error:${err.stack}`);
        }
      }
    };


    const handleEdit = async (id) => {
      const datetime = format(new Date(), `MMM dd, yyyy pp`);
      const updatePost = { id, title: editTitle, datetime, body: editBody };
      try {
        const response = await api.put(`/posts/${id}`, updatePost);
        setPosts(
          posts.map((item) => (item.id === id ? { ...response.data } : item))
        );
        setEditTitle("");
        setEditBody("");
        navigate("/");
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error:${err.stack}`);
        }
      }
    };

  return(
   <DataContext.Provider value={{
    width,search,setSearch,searchResults,fetchError,isLoading,handleSubmit, postTitle, setPostTitle, postBody, setPostBody,posts, editTitle, editBody, setEditTitle, setEditBody, handleEdit,handleDelete,height

   }}>
    {children}
   </DataContext.Provider>
  )
}
export default DataContext