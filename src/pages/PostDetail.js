import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getAuth } from "firebase/auth";

import { deletePostFB } from "../redux/modules/post";

const PostDetail = () => {
  //Post리스트와 이전에서 넘겨받은 index useParams로 바음
  const post_lists = useSelector((state) => state.post.list);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const index = params.index;

  //작성자와 유저가 동일한지 확인
  const auth = getAuth();
  const user = auth.currentUser;

  const user_check = (index, user) => {
    if (user) {
      if (user.email === post_lists[index].user_id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <CardStyleD>
      <InfoTitle>
        <h5 style={{ fontStyle: " italic" }}>{post_lists[index].nick}님의 게시물 <br /> {post_lists[index].upload_time}</h5>
        {user_check(index, user) ? (
          <EDBtn>
            <button onClick={() => { navigate("/postedit/" + index) }}>수정하기</button>
            <button onClick={() => {
              dispatch(deletePostFB(post_lists[index].id));
              window.alert("삭제 완료");
              navigate("/");
            }}>삭제하기</button>
          </EDBtn>
        ) : (null)
        }
      </InfoTitle>
      {
        `${post_lists[index].layer}` === "leftText"
          ? (
            <Rowlayer>
              <RowTxt>{post_lists[index].explanation}</RowTxt>
              <RowImg src={post_lists[index].image_url} alt="업로드 사진" />
            </Rowlayer>)
          : (null)
      }
      {
        `${post_lists[index].layer}` === "rightText"
          ? (
            <Rowlayer>
              <RowImg src={post_lists[index].image_url} alt="업로드 사진" />
              <RowTxt> {post_lists[index].explanation} </RowTxt>
            </Rowlayer>)
          : (null)
      }
      {
        `${post_lists[index].layer}` === "downText"
          ? (
            <Columnlayer>
              <ColImg src={post_lists[index].image_url} alt="업로드 사진" />
              <ColTxt > {post_lists[index].explanation} </ColTxt >
            </Columnlayer>)
          : (null)
      }
      <br />
      <button onClick={() => { navigate("/") }}>돌아가기</button>
    </CardStyleD>
  );
}

const CardStyleD = styled.div`
margin: 200px auto 20px auto;
width: 80vw;
background-color: #cfffaf;
padding: 20px;
border: 2px solid blueviolet;
border-radius: 10px;
`;

const InfoTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 10px;
`;

const EDBtn = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 10px;
`;

const Rowlayer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 20px;
margin: auto;
`;

const RowImg = styled.img`
width: 40vw;
height: 40vh;
object-fit: cover;
`;

const RowTxt = styled.div`
width: 40vw;
height: 40vh;
line-height: 40vh;
background-color: white;
`;

const Columnlayer =styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ColImg = styled.img`
width: 60vw;
height: 60vh;
object-fit: cover;
`;

const ColTxt = styled.div`
width: 60vw;
height: 20vh;
line-height: 20vh;
margin: 20px;
background-color: white;
`;

export default PostDetail;