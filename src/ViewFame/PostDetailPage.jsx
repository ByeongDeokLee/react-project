import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../CssFolder/PostDetailPage.css";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || []);

  console.log(post);

  // const [post, setPost] = useState({
  //   id: parseInt(id),
  //   title: "홈페이지 제작 후기",
  //   author: "홍길동",
  //   date: "2024.03.15",
  //   content: "홈페이지 제작 과정에서의 경험과 팁을 공유합니다...",
  //   views: 150,
  //   likes: 25,
  // });

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "김철수",
      content: "좋은 정보 감사합니다!",
      date: "2024.03.15",
      likes: 5,
      replies: [
        {
          id: 2,
          author: "홍길동",
          content: "도움이 되어 기쁩니다!",
          date: "2024.03.15",
          likes: 2,
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      likes: prev.likes + 1,
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      author: "현재 사용자",
      content: newComment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      replies: [],
    };

    if (replyTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo
            ? { ...c, replies: [...c.replies, comment] }
            : c
        )
      );
      setReplyTo(null);
    } else {
      setComments((prev) => [...prev, comment]);
    }
    setNewComment("");
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
          <button type="submit" >
            {replyTo ? "답글 작성" : "댓글 작성"}
          </button>
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