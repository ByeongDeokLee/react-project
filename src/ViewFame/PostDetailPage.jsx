import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../CssFolder/PostDetailPage.css";
import useApi from "../js/useApi";

// const pipe =
//   (...fns) =>
//   (arg) =>
//     fns.reduce((acc, fn) => fn(acc), arg);
// const go = (arg, ...fns) => pipe(...fns)(arg);
const pipeAsync =
  (...fns) =>
  (arg) =>
    fns.reduce(
      (acc, fn) => (acc.then ? acc.then(fn) : Promise.resolve(fn(acc))),
      arg
    );

const goAsync = (arg, ...fns) => pipeAsync(...fns)(arg);

const commentData = (comment) => console.log("데이터 있나?", comment);
// comment.trim() ? return :  comment

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { request } = useApi(); // useApi 훅에서 request 받아오기
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || []);

  const [comments, setComments] = useState(location.state?.comments || []);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      likes: prev.likes + 1,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("여기 들어옴?");
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "현재 사용자",
      content: newComment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      replies: [],
    };

    try {
      goAsync(
        comment,
        async (comment) => {
          // console.log("11111", id);
          // console.log("2222", comment);
          const response = await request({
            method: "post",
            url: `http://localhost:4000/api/posts/${id}/comments-write`,
            data: comment,
          });
          return { response };
        },
        ({ response }) => {
          setComments(response);
          setReplyTo(null);
          setNewComment("");
        }
      );
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
    // if (!newComment.trim()) return;

    // const comment = {
    //   id: comments.length + 1,
    //   author: "현재 사용자",
    //   content: newComment,
    //   date: new Date().toLocaleDateString(),
    //   likes: 0,
    //   replies: [],
    // };

    // const response = await request({
    //   method: "post",
    //   url: `http://localhost:4000/api/posts/${id}/comments-write`,
    //   data: comment,
    // });

    // // 서버에서 최신 댓글 리스트를 받아왔으므로, setComments(response)만 하면 됨.
    // setComments(response);
    // setReplyTo(null);
    // setNewComment("");
  };

  return (
    <div className="post-detail-page">
      <div className="post-header">
        <h1>{post.title}</h1>
        <div className="post-info">
          <span>작성자: {post.author}</span>
          <span>작성일: {post.date}</span>
          <span>조회수: {post.views}</span>
          <button onClick={handleLike}>좋아요 {post.likes}</button>
        </div>
      </div>

      <div className="post-content">{post.content}</div>

      <div className="comments-section">
        <h2>댓글</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "답글을 입력하세요" : "댓글을 입력하세요"}
          />
          <button type="submit">{replyTo ? "답글 작성" : "댓글 작성"}</button>
          {replyTo && (
            <button type="button" onClick={() => setReplyTo(null)}>
              취소
            </button>
          )}
        </form>

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="author">{comment.author}</span>
                <span className="date">{comment.date}</span>
                <button onClick={() => setReplyTo(comment.id)}>답글</button>
              </div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-actions">
                <button>좋아요 {comment.likes}</button>
              </div>

              {comment.replies.map((reply) => (
                <div key={reply.id} className="reply">
                  <div className="reply-header">
                    <span className="author">{reply.author}</span>
                    <span className="date">{reply.date}</span>
                  </div>
                  <div className="reply-content">{reply.content}</div>
                  <div className="reply-actions">
                    <button>좋아요 {reply.likes}</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="post-actions">
        <button onClick={() => navigate("/board")}>목록으로</button>
        <button onClick={() => navigate(`/board/edit/${id}`)}>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default PostDetailPage;
