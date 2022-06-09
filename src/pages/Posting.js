/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { storage } from "../shared/firebase";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { addPostFB } from "../redux/modules/post";

import { useDispatch, useSelector } from "react-redux";

const Posting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //작성이 되었는지 확인
    const [img_check, setImg] = React.useState(null);
    const [exp_check, setExp] = React.useState("");

    const explanation_ref = React.useRef(null);
    const file_link_ref = React.useRef(null);

    //유저 정보 가져오기
    const auth = getAuth();
    const user = auth.currentUser;

    const user_list = useSelector((state) => state.users.list);
    const user_index = user_list.findIndex((b) => {
        return b.user_id === user.email;
    });

    // layer 선택
    const [layer_value, setLayout] = React.useState("");
    const is_checked = (e) => {
        if (e.target.checked) {
            setLayout(e.target.value);
        }
    };

    //작성 날짜
    const t_stamp = new Date();
    let up_time = t_stamp.toDateString() + ", " + t_stamp.getHours() + ":" + t_stamp.getMinutes();

    //이미지 업로드
    const uploadFB = async (e) => {

        const uploaded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );


        const file_url = await getDownloadURL(uploaded_file.ref);

        file_link_ref.current = { url: file_url };
        setImg(file_link_ref.current.url);
    };

    //Post 추가
    const addPostList = () => {
        dispatch(addPostFB(
            {
                user_id: user.email,
                nick: user_list[user_index].nick,
                image_url: file_link_ref.current?.url,
                explanation: explanation_ref.current?.value,
                layer: layer_value,
                timestamp: t_stamp,
                upload_time: up_time,
            }
        ));
        window.alert("작성완료");

        navigate("/");
    };

    return (
        <PostingPage>
            <Subtitle>게시글 작성</Subtitle>
            <CardStyle style={{ backgroundColor: "#cfffaf" }}>
                <CardInside>
                    <ImgTxtDiv>
                        <ImgDiv>
                            <h3>이미지 첨부</h3>
                            <InputImg type="file" onChange={uploadFB} />
                        </ImgDiv>
                        <TxtDiv>
                            <h3 style={{ margin: "10px auto" }}>게시글작성</h3>
                            <InputTxt
                                type="text"
                                ref={explanation_ref}
                                onChange={(e) => {
                                    setExp(e.target.value);
                                }} />
                        </TxtDiv>
                    </ImgTxtDiv>
                    <LayerDiv>
                        <h3>레이아웃 고르기</h3>
                        <div>
                            <input type="radio" name="layer" value="leftText" onChange={is_checked} style={{ marginBottom: "10px" }} />왼쪽에 텍스트 오른쪽에 이미지<br />
                            <RowLayer>
                                <RowTxt>텍스트</RowTxt>
                                <RowImg src={img_check} />
                            </RowLayer>
                        </div>
                        <div>
                            <input type="radio" name="layer" value="rightText" onChange={is_checked} style={{ marginBottom: "10px" }} />오른쪽에 텍스트 왼쪽에 이미지  <br />
                            <RowLayer>
                                <RowImg src={img_check} />
                                <RowTxt>텍스트</RowTxt>
                            </RowLayer>
                        </div>
                        <div>
                            <input type="radio" name="layer" value="downText" onChange={is_checked} style={{ marginBottom: "10px" }} />상단에 이미지 하단에 텍스트 <br />
                            <ColLayer>
                                <ColImg src={img_check} />
                                <ColTxt>텍스트</ColTxt>
                            </ColLayer>
                        </div>
                    </LayerDiv>
                </CardInside>
            </CardStyle>
            <AddWordBtn onClick={addPostList}
                disabled={
                    img_check === null || exp_check === "" || layer_value === ""
                        ? true : false
                }
            >작성 완료</AddWordBtn>
        </PostingPage>
    );
};

const PostingPage = styled.div`
margin-top: 120px;
`;

const Subtitle = styled.h1`
    width: 325px;
    height: 50px;
    font-weight: 600;
    text-align: center;
    margin: 0px auto;
    color: darkblue;
`;

const CardStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin: 10px auto auto auto;
border: 20px solid lightskyblue;
border-radius: 10px;
width: 80vw;
background-color: #cfffaf;
`;

const CardInside = styled.div`
display: flex;
flex-direction: row;
width: 100%;
gap: 10px;
margin: 0px;
padding: 0px;
`;

const ImgTxtDiv = styled.div`
display: flex;
flex-direction: column;
width: 50%;
margin: 0px;
`;

const ImgDiv = styled.div`
height: 30%;
margin: auto;
padding: 0;
`;

const InputImg = styled.input`
background-color: white;
width: 300px;
height: 24px;
`;

const TxtDiv = styled.div`
height: 70%;
margin: 0;
`;

const InputTxt = styled.input`
width: 80%;
height: 80%;
text-align: center;
`;

const LayerDiv = styled.div`
display: flex;
flex-direction: column;
width: 50%;
margin: 0;
max-height: 100%;
`;

const RowLayer = styled.div`
display: flex;
flex-direction: row;
height: 100px;
justify-content: center;
`;

const RowTxt = styled.div`
width: 15vh;
height: 8vh;
line-height: 8vh;
background-color: white;
`;

const RowImg = styled.img`
width: 15vh;
height: 8vh;
object-fit: cover;
`;

const ColLayer = styled.div`
height: 100px;
margin: auto;
`;

const ColImg = styled.img`
width: 20vh;
height: 4vh;
object-fit: cover;
`;

const ColTxt = styled.div`
width: 20vh;
height: 4vh;
line-height: 4vh;
margin: auto;
background-color: white;
`;

const AddWordBtn = styled.button`
    margin: 10px auto;
    width: 82vw;
    height: 50px;
    background-color: #673ab7;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

export default Posting;