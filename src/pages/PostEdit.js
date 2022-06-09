/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { editPostFB } from "../redux/modules/post";

const PostEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const index = params.index;
    const post_list = useSelector((state) => state.post.list);
    //수정된 설명으로
    const explanation_ref = React.useRef(null);
    // 수정된 시간으로 저장
    const t_stamp = new Date();
    let up_time = t_stamp.toDateString() + ", " + t_stamp.getHours() + ":" + t_stamp.getMinutes();
    // 수정된 레이어로
    const [layer_value, setLayout] = React.useState("");
    const is_checked = (e) => {
        if (e.target.checked) {
            setLayout(e.target.value);
        }
    };

    const EditPostList = () => {
        dispatch(editPostFB({
            explanation: explanation_ref.current.value,
            layer: layer_value,
            upload_time: up_time,
            timestamp: t_stamp,
        }, post_list[index].id
        ));
        window.alert("수정이 완료되었습니다!")
        navigate("/postdetail/" + index);
    }
    return (
        <Page>
            <CardStyleE>
                <SubtitleE>게시글 수정</SubtitleE>
                <InfoE>
                    <ImgTxtDiv>
                        <ImgDiv>
                            <Img src={post_list[index].image_url} />
                        </ImgDiv>
                        <TxtDiv>
                            <TxtTitle>게시글작성</TxtTitle>
                            <TxtInput type="text" ref={explanation_ref} defaultValue={post_list[index].explanation} />
                        </TxtDiv>
                    </ImgTxtDiv>
                    <LayerDiv >
                        <h3>레이아웃 고르기</h3>
                        <div>
                            <input type="radio" name="layer" value="leftText" onChange={is_checked} style={{ marginBottom: "10px" }} />왼쪽에 텍스트 오른쪽에 이미지<br />
                            <Rowlayer>
                                <RowTxt>텍스트</RowTxt>
                                <RowImg src={post_list[index].image_url} />
                            </Rowlayer>
                        </div>
                        <div>
                            <input type="radio" name="layer" value="rightText" onChange={is_checked} style={{ marginBottom: "10px" }} />오른쪽에 텍스트 왼쪽에 이미지  <br />
                            <Rowlayer >
                                <RowImg src={post_list[index].image_url} />
                                <RowTxt>텍스트</RowTxt>
                            </Rowlayer >
                        </div>
                        <div>
                            <input type="radio" name="layer" value="downText" onChange={is_checked} style={{ marginBottom: "10px" }} />상단에 이미지 하단에 텍스트 <br />
                            <Collayer>
                                <ColImg src={post_list[index].image_url} />
                                <ColTxt>텍스트</ColTxt>
                            </Collayer>
                        </div>
                    </LayerDiv>
                </InfoE>
            </CardStyleE >
            <AddWordBtnE onClick={EditPostList}>작성 완료</AddWordBtnE>
        </Page>
    );
};

const Page = styled.div`
margin-top: 120px;
`;

const CardStyleE = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 80vw;
margin: 10px auto;
border: 20px solid lightskyblue;
border-radius: 10px;
background-color: #cfffaf;
`;

const SubtitleE = styled.h1`
width: 325px;
height: 50px;
font-size: 25px;
font-weight: 600;
text-align: center;
margin-top: 25px;
color: darkviolet;
text-decoration: underline blueviolet;
`;

const InfoE = styled.div`
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

const Img = styled.img`
width: 100%;
height: 100%;
`;

const TxtDiv = styled.div`
 height: 70%;
 margin: 0;
`;

const TxtTitle = styled.h5`
text-decoration: underline;
margin: 10px auto;
`;

const TxtInput = styled.input`
width: 80%;
height: 80%;
text-align: center;
`;

const LayerDiv = styled.div`
display: flex;
flex-direction: column;
width: 50%;
`;

const Rowlayer = styled.div`
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

const Collayer = styled.div`
margin: auto;
height: 100px;
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
background-color: white;
margin: auto;
`;



const AddWordBtnE = styled.button`
    margin: 10px auto;
    width: 80%;
    height: 50px;
    background-color: #673ab7;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

export default PostEdit;