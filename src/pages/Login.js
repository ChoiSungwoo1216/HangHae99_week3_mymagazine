import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {

    const navigate = useNavigate();

    //작성 되었는지 확인
    const [id_check, setId] = React.useState("");
    const [pwd_check, setPwd] = React.useState("");

    //로그인 용
    const id_ref = React.useRef("");
    const password_ref = React.useRef("");

    const loginFB = async () => {
        //에러가 뜨면 catch가 불려온다.
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                id_ref.current.value,
                password_ref.current.value
            );
            console.log(user);

            if (user.operationType === "signIn") {
                window.alert("환영합니다");
                navigate("/");
            }
        } catch (e) {
            window.alert("다시 시도해주세요");
        }
    }


    return (
        <WordDiv>
            <Subtitle>로그인</Subtitle>
            <CardStyle>
                <IdPwdTitle>아이디</IdPwdTitle>
                <Input>
                    <input type="text" ref={id_ref} style={{ width: "300px" }}
                        onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Input>
                <IdPwdTitle>비밀번호</IdPwdTitle>
                <Input>
                    <input type="password" ref={password_ref} style={{ width: "300px" }}
                        onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </Input>
                <LoginBtn disabled={id_check === "" || pwd_check === ""
                    ? true : false} onClick={loginFB}>로그인하기</LoginBtn>
            </CardStyle>
        </WordDiv>
    );
};

const WordDiv = styled.div`
max-width: 450px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 100px auto;
`;

const Subtitle = styled.div`
    width: 325px;
    height: 50px;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-top: 25px;
    color: darkviolet;
    text-decoration: underline blueviolet;
`;

const CardStyle = styled.div`
margin: 10px;
padding: 10px;
border: 20px solid lightskyblue;
border-radius: 10px;
background-color: #cfffaf;
`;

const IdPwdTitle = styled.h5`
text-decoration: underline;
margin: 0px auto;
`;

const Input = styled.div`
  width: 300px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 16px auto;
  display: flex;
  & input{
    border: 1px solid #888;
    width: 70%;
  }
  
  & input:focus {
    outline: none;
    border: 3px solid #888;
  }
`;

const LoginBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    background-color: #673ab7;
    color: white;
    font-size: 20px;
    font-weight: bold;

`;
export default Login;