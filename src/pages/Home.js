import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//유저 정보 확인
import { auth } from "../shared/firebase";
import { onAuthStateChanged} from 'firebase/auth';

//Post 페이지 호출
import Post from "./Post";

const Home = () => {
  const navigate = useNavigate();

  //로그인이 되어 있는지 확인
  const [is_login, setIsLogin] = React.useState(false);

  const loginCheck = async (user) => {
      if (user) {
          setIsLogin(true);
      } else {
          setIsLogin(false);
      }
  }
  
  React.useEffect(() => {
      onAuthStateChanged(auth, loginCheck);
  })



  return (
    <Main>
      <Post/>
      {is_login ? (
        <AddBtn onClick={() => {
          navigate("/posting");
        }}
        >+</AddBtn>
      ) : (
        (null)
      )}

    </Main>
  )
}

const Main = styled.div`
width: 100vw;
margin: 100px auto auto auto;
`;

const AddBtn = styled.div`

position: fixed;
bottom: 5vh;
right: 5vw;
width: 50px;
height: 50px;
border-radius: 50px;
background-color: #673ab7;
padding: 25px, 25px;
color: white;
line-height: 55%;
text-align: center;
font-size: 65px;
font-weight: bold;

transition: transform 300ms ease-in-out;
&:hover {
  transform: rotate(90deg);
}
`;

export default Home;