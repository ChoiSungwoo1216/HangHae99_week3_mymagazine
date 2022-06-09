import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";

import { deletePostFB } from "../redux/modules/post";

const Post = () => {
  // load한 post리스트를 가져온다.
  const post_lists = useSelector((state) => state.post.list);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth();
  const user = auth.currentUser;

  // 작성자와 현재 유저가 동일한지 파악
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
    <ListStyle>
      {post_lists.map((list, index) => {
        return (
          <CardStyle key={index}>
            <NameDateEDBtn>
              <h5 style={{ fontStyle: " italic" }}> {list.nick}님의 게시물 <br/> {list.upload_time}</h5>
              {user_check(index, user) ? (
                <EDBtn>
                  <button
                    onClick={() => {
                      navigate("/postedit/" + index);
                    }}
                  >수정하기</button>
                  <button
                    onClick={() => {
                      dispatch(deletePostFB(post_lists[index].id));
                      window.alert("삭제 완료");
                      navigate("/");
                    }}
                  >삭제하기</button>
                </EDBtn>
              ) : (null)
              }
            </NameDateEDBtn>
            {
              `${list.layer}` === "rightText"
                ? (
                  <RowImgTxt
                    onClick={() => {
                      navigate("/postdetail/" + index);
                    }}
                  >
                    <RowImg src={list.image_url} alt="불러오기 실패" />
                    <Explanation> {list.explanation} </Explanation>
                  </RowImgTxt>)
                : (null)
            }

            {
              `${list.layer}` === "leftText"
                ? (
                  <RowImgTxt
                    onClick={() => {
                      navigate("/postdetail/" + index);
                    }}
                  >
                    <Explanation> {list.explanation} </Explanation>
                    <RowImg src={list.image_url} alt="불러오기 실패"/>
                  </RowImgTxt>)
                : (null)
            }
            {
              `${list.layer}` === "downText"
                ? (
                  <ColumnImgTxt
                    onClick={() => {
                      navigate("/postdetail/" + index);
                    }}
                  >
                    <ColumnImg src={list.image_url} alt="불러오기 실패" />
                    <Explanation> {list.explanation} </Explanation>
                  </ColumnImgTxt>)
                : (null)
            }
          </CardStyle>
        );
      })}
    </ListStyle>
  );
};



const ListStyle = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;


const CardStyle = styled.div`
align-items: center;
justify-content: center;
width: 50vw;
background-color: #cfffaf;
margin : 20px auto;
padding: 0px 20px 20px 20px;
border: 2px solid blueviolet;
border-radius: 10px;
transition: box-shadow 300ms ease-in-out;
&:hover {
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px 0px;
}
`;

const NameDateEDBtn = styled.div`
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

const RowImgTxt = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: 5%;
margin: auto; 
`;

const ColumnImgTxt = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 5%;
margin: auto;
`

const RowImg = styled.img`
width: 20vw;
height: 20vh;
object-fit: cover; 
`;

const ColumnImg = styled.img`
width: 20vw;
height: 20vh;
object-fit: cover; 
margin-bottom: 5%;
`;

const Explanation = styled.div`
width: 20vw;
height: 20vh;
background-color: white;
line-height: 20vh;
`
export default Post;