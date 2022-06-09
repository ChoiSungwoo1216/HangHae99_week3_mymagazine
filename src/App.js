import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

//firebase 
import { loadPostFB} from "./redux/modules/post";
import { loadUsersFB } from "./redux/modules/users";

//pages
import Header from "./pages/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Posting from "./pages/Posting"
import PostDetail from "./pages/PostDetail"
import PostEdit from "./pages/PostEdit"


function App() {

  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(loadPostFB());
    dispatch(loadUsersFB());
  });


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/posting" element={<Posting />}></Route>
        <Route path="/postdetail/:index" element={<PostDetail />}></Route>
        <Route path="/postedit/:index" element={<PostEdit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
