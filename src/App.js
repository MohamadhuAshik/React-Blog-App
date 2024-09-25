import { Routes, Route } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPosts from "./EditPosts";
import { DataProvider } from "./context/DataContext";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false)

  const [isname, setIsName] = useState("")
  let token;
  let name;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")
    name = localStorage.getItem("name")
  }
  console.log("token", token)

  useEffect(() => {

    if (token) {
      setIsLogin(true)
      setIsName(name)
    } else {
      setIsLogin(false)
      setIsName("")
    }

  }, [token])

  console.log("isLogin", isLogin)
  return (
    <div className="App">
      <DataProvider>
        {isLogin ? (<>
          <Header title={`${isname} Social Media`} />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post">
              <Route index element={<NewPost />} />
              <Route
                path=":id"
                element={<PostPage />}
              />
            </Route>
            <Route path="/edit/:id" element={<EditPosts />} />
            <Route path="/about" element={<About />} />
            <Route path="/*" element={<Missing />} />
          </Routes>
          <Footer />
        </>
        )
          : (
            <>
              <Header title="Social Media" />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={<Missing />} />
              </Routes>
              <Footer />
            </>
          )}


      </DataProvider>
    </div>
  );
}

export default App;
