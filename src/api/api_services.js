import axios from "axios";


const baseURL = process.env.REACT_APP_BASE_URL /*  ||   "http://localhost:6969" */
console.log("baseURL", baseURL)
let token = localStorage.getItem("token")



const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { Authorization: "Bearer " + token }
})


const signUp = async (data) => {
  try {
    const response = await axios.post(
      baseURL + "/user/signup", data
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

const Login = async (data) => {
  try {
    const response = await axios.post(
      baseURL + "/user/login", data
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

const getPost = async () => {
  try {
    const response = await instance.get(
      baseURL + "/posts/get"
    )
    return response.data
  } catch (error) {
    return error;
  }
}

const createPost = async (data) => {
  try {
    const response = await instance.post(
      baseURL + "/posts/post", data
    )
    return response.data
  } catch (err) {
    return err
  }
}

const postGetById = async (id) => {
  try {
    const response = await axios.get(
      baseURL + `/posts/getbyid/${id}`
    )
    return response.data
  } catch (err) {
    return err
  }
}

const editPost = async (id, data) => {
  try {
    const response = await axios.put(
      baseURL + `/posts/edit/${id}`, data
    )
    return response.data
  } catch (err) {
    return err
  }
}

const deletePost = async (id) => {
  try {
    const response = await axios.delete(
      baseURL + `/posts/delete/${id}`
    )
    return response.data
  } catch (err) {
    return err
  }
}
export const ApiServices = {
  signUp, Login, getPost, createPost, postGetById, editPost, deletePost
}