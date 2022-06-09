import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { auth } from "../shared/firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';


const Header = () => {
    const navigate = useNavigate();

    //로그인 확인
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
        <HeaderContainer>
            <HomeBtn>
                <button onClick={() => { navigate("/") }}>Home</button>
            </HomeBtn>
            <Title> My Magazine </Title>
            <AboutLogin>
                {is_login ? (
                    <button onClick={() => { signOut(auth) }}>로그아웃</button>
                ) : (
                    <div>
                        <button style={{margin:"10px"}} onClick={() => { navigate("/login") }}>로그인하기</button>
                        <button onClick={() => { navigate("/signup") }}>회원가입하기</button>
                    </div>
                )}
            </AboutLogin>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100px;
      background-color: #cfffaf;
      border-bottom: 2px solid blueviolet;
`;

const HomeBtn = styled.div`
position: fixed;
top: 40px;
left: 20px
`;

const Title = styled.h1`
    color: slateblue;
    text-align: center;
    font-size: 50px;
    font-weight: 600;
    text-decoration: none;
`;

const AboutLogin = styled.div`
position: fixed;
top: 40px;
right: 20px;
`;



export default Header;
