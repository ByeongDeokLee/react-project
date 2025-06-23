const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
//const queries = require('./src/db/queries'); // queries.js 파일 전체를 가져옴
app.use(express.json()); // JSON 요청 파싱
app.use(express.urlencoded({ extended: true })); // 폼 데이터 파싱


const { Client } = require("pg");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getCommentsByPostId,
  createComment,
  createReply,
  togglePostLike,
  updatePostViews,
} = require("../db/queries");

app.use(cors());
app.use(express.json());

// 이메일 전송을 위한 transporter 설정
const transporter = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.NAVER_EMAIL, // 환경 변수에서 이메일 주소 가져오기
    pass: process.env.NAVER_PASSWORD, // 환경 변수에서 비밀번호 가져오기
  },
});

// 문의하기 API 엔드포인트
app.post("/api/send-inquiry", async (req, res) => {
  console.log("문의하기 API 요청 받음:", req.body);
  console.log("네이버 PWD :", process.env.NAVER_PASSWORD);
  console.log("네이버 ID :", process.env.NAVER_EMAIL);

  try {
    const { title, category, content } = req.body;

    // 필수 데이터 검증
    if (!title || !category || !content) {
      console.error("필수 데이터 누락:", { title, category, content });
      return res.status(400).json({
        success: false,
        message: "필수 입력 항목이 누락되었습니다.",
      });
    }

    // 환경 변수 확인
    if (!process.env.NAVER_EMAIL || !process.env.NAVER_PASSWORD) {
      console.error("이메일 설정 누락:", {
        email: process.env.NAVER_EMAIL ? "설정됨" : "설정안됨",
        password: process.env.NAVER_PASSWORD ? "설정됨" : "설정안됨",
      });
      return res.status(500).json({
        success: false,
        message: "이메일 서버 설정이 누락되었습니다.",
      });
    }

    const mailOptions = {
      from: process.env.NAVER_EMAIL,
      to: process.env.NAVER_EMAIL,
      subject: `[문의하기] ${title}`,
      html: `
        <h2>문의 내용</h2>
        <p><strong>문의 유형:</strong> ${category}</p>
        <p><strong>문의 내용:</strong></p>
        <p>${content}</p>
      `,
    };

    console.log("이메일 전송 시도:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    await transporter.sendMail(mailOptions);
    console.log("이메일 전송 성공");
    res.json({ success: true, message: "이메일이 성공적으로 전송되었습니다." });
  } catch (error) {
    console.error("이메일 전송 실패 - 상세 에러:", {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });
    res.status(500).json({
      success: false,
      message: "이메일 전송에 실패했습니다.",
      error: error.message,
    });
  }
});

// 게시글 목록 조회
app.get("/api/posts", async (req, res) => {
  try {
    console.log("게시글 목록 조회 요청 들어옴");
    const posts = await getPosts();
    posts.map((post) => {
      post.date = new Date(post.updated_at)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "");
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시글 상세 조회
app.get("/api/posts/:id", async (req, res) => {
  try {
    // 조회수 증가
    await updatePostViews(req.params.id);

    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    console.log("post :", post);
    post.date = new Date(post.updated_at).toISOString().split("T")[0];
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시글 작성
app.post("/api/posts-write", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await createPost(title, content, author);
    res.status(201).json(post);
    console.log("게시글 작성 요청 받음");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시글 수정
app.put("/api/posts/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await updatePost(req.params.id, title, content);
    if (!post) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시글 삭제
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await deletePost(req.params.id);
    res.json({ message: "게시글이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 댓글 목록 조회
app.get("/api/posts/:id/comments", async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.id);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 댓글 작성
app.post("/api/posts/:id/comments-write", async (req, res) => {
  try {
    console.log("댓글 작성 요청 받음", req.body);
    const { content, author } = req.body;
    try {
      await createComment(req.params.id, content, author);
    } catch (error) {
      // 만약 unique constraint 에러(중복 PK)라면, 클라이언트에 명확히 안내
      if (
        error.message &&
        error.message.includes("duplicate key value violates unique constraint")
      ) {
        return res.status(400).json({
          error: "이미 존재하는 댓글 ID로 인해 댓글을 저장할 수 없습니다. 다시 시도해주세요.",
          detail: error.message,
        });
      }
      // 그 외 에러는 throw해서 상위에서 처리
      throw error;
    }

    // 댓글 작성 후, 최신 댓글 목록을 다시 조회해서 내려줌
    const comments = await getCommentsByPostId(req.params.id);
    res.status(201).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 답글 작성
app.post("/api/comments/:id/replies", async (req, res) => {
  try {
    const { content, author } = req.body;
    const reply = await createReply(req.params.id, content, author);
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시글 좋아요 토글
app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await togglePostLike(req.params.id, userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log("환경 변수 확인:", {
    email: process.env.NAVER_EMAIL ? "설정됨" : "설정안됨",
    password: process.env.NAVER_PASSWORD ? "설정됨" : "설정안됨",
  });
});
