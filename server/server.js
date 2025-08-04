const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const multer = require('multer');
require("dotenv").config();
const app = express();
//const queries = require('./src/db/queries'); // queries.js 파일 전체를 가져옴
app.use(express.json()); // JSON 요청 파싱
app.use(express.urlencoded({ extended: true })); // 폼 데이터 파싱

//네이버
const NAVER_REDIRECT_URI = "http://localhost:3000/oauth/callback";

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
  registerUser,
  UserLogin,
  NoticeList,
  getNotice,
  updateNoticeViews,
  reviewsList,
  serviceList,
  memberList,
  getMemberInfo,
} = require("../db/queries");

app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}


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


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 폴더 미리 만들어야 함
  },
  filename: (req, file, cb) => {
    // 고유 파일명 저장
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + Buffer.from(file.originalname, 'latin1').toString('utf8'));
  },
});

const upload = multer({ storage: storage });

//서비스 종류 API
app.get("/api/serviceList", async (req, res) => {
  try {
    console.log("서비스 API 들어옴")
    const services = await serviceList();
    // console.log("쿼리응답 받음", services)
    services.map((service) => {
      service.date = new Date(service.created_at)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "");
    });
    res.json(services);
      // return res.json(merged);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
})


//리뷰
app.get("/api/reviewsList", async (req, res) => {
  try {
    console.log("리뷰API 들어옴")
    const reviews = await reviewsList();
    console.log("쿼리응답 받음", reviews)
    reviews.map((reviews) => {
      reviews.date = new Date(reviews.created_at)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "");
    });
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
})


//공지사항
app.get("/api/NoticeList", async (req, res) => {
  try {
    console.log("getNotice 요청 받음");
    const notices = await NoticeList();
    console.log("공지사항 :: ", notices)
    notices.map((notice) => {
      notice.date = new Date(notice.date)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\.$/, "");
    });
    console.log("getNotice :", notices);
    res.json(notices);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//공지사항 상세페이지
app.post("/api/getNotice/:id", async (req, res) => {
  try {
    console.log("게시물 View 증가");

    await updateNoticeViews(req.params.id);

    const noticeDtl = await getNotice(req.params.id);
    noticeDtl.date = new Date(noticeDtl.date)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.$/, "");
    console.log("공지사항 데이터 : ", noticeDtl);
    res.json(noticeDtl);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 문의하기 API
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
          error:
            "이미 존재하는 댓글 ID로 인해 댓글을 저장할 수 없습니다. 다시 시도해주세요.",
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
//로그인 확인
app.post("/api/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserLogin(email, password);
    console.log("서버 응답값", result);

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//네이버 로그인
app.post("/api/naver/login", async (req, res) => {
  const { code, state } = req.body;
  try {
    console.log("네이버 로그인 요청 받음", req.body);
    // 1. 네이버에 토큰 요청
    const tokenRes = await axios.post(
      "https://nid.naver.com/oauth2.0/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.pNAVER_CLIENT_KEY,
          client_secret: process.env.NAVER_SECRET_KEY,
          redirect_uri: NAVER_REDIRECT_URI,
          code,
          state,
        },
      }
    );
    const accessToken = tokenRes.data.access_token;

    // 2. 네이버에 사용자 정보 요청
    const userRes = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    res.json(userRes.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// 회원가입 API
app.post("/api/register", upload.single("profileImage"), async (req, res) => {
  try {
    const parsedData = JSON.parse(req.body.data);
const { password, email, name, birthdate, phone,introduction,specialties } = parsedData;


    console.log("응답데이터  :" , email, password, name, birthdate, phone)
    if (!email || !password || !name || !birthdate || !phone) {
      return res.status(400).json({ error: "모든 필수 정보를 입력해주세요." });
    }

    // ⚠️ 이미지 경로 처리
    let profile_image = null;
    if (req.file) {
      profile_image = `/uploads/${req.file.filename}`;
    }

    const random_user_value =
      Math.random().toString(36).slice(2) + Date.now().toString(36);

    const newUser = {
      password,
      email,
      name,
      birthdate,
      phone,
      random_user_value,
      profile_image, // ✅ 추가
    };

    console.log("newUser", newUser)

    const user = await registerUser(newUser);

    return res.json({ success: true, userId: user.id });
  } catch (err) {
    console.error("회원가입 처리 중 에러:", err.message);
    return res.status(500).json({ error: err.message });
  }
});


app.get("/api/memberList", async (req, res) => {
  try {
    console.log("memberList 조회")
    const response = await memberList();
    console.log("memberList 응답값", response)
    res.json({ response});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

app.get("/api/memberList/:id", async (req, res) => {
  try {
    console.log("memberList 조회", req.params.id)
    const response = await getMemberInfo(req.params.id);
    if (response.career % 12 == 0) {
      response.experience =  Math.floor(response.career / 12) + "년"
    } else {
      response.experience =  Math.floor(response.career / 12) + "년" + (response.career % 12) + "개월"
    }
    console.log("memberList 응답값", response)

    // post.date = new Date(post.updated_at).toISOString().split("T")[0];
    res.json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log("환경 변수 확인:", {
    email: process.env.NAVER_EMAIL ? "설정됨" : "설정안됨",
    password: process.env.NAVER_PASSWORD ? "설정됨" : "설정안됨",
  });
});
