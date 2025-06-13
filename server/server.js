const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

// 이메일 전송을 위한 transporter 설정
const transporter = nodemailer.createTransport({
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: process.env.NAVER_EMAIL, // 환경 변수에서 이메일 주소 가져오기
    pass: process.env.NAVER_PASSWORD // 환경 변수에서 비밀번호 가져오기
  }
});

// 문의하기 API 엔드포인트
app.post('/api/send-inquiry', async (req, res) => {
  console.log('문의하기 API 요청 받음:', req.body);

  try {
    const { title, category, content, contact } = req.body;

    // 필수 데이터 검증
    if (!title || !category || !content || !contact) {
      console.error('필수 데이터 누락:', { title, category, content, contact });
      return res.status(400).json({
        success: false,
        message: '필수 입력 항목이 누락되었습니다.'
      });
    }

    // 환경 변수 확인
    if (!process.env.NAVER_EMAIL || !process.env.NAVER_PASSWORD) {
      console.error('이메일 설정 누락:', {
        email: process.env.NAVER_EMAIL ? '설정됨' : '설정안됨',
        password: process.env.NAVER_PASSWORD ? '설정됨' : '설정안됨'
      });
      return res.status(500).json({
        success: false,
        message: '이메일 서버 설정이 누락되었습니다.'
      });
    }

    const mailOptions = {
      from: process.env.NAVER_EMAIL,
      to: process.env.NAVER_EMAIL,
      subject: `[문의하기] ${title}`,
      html: `
        <h2>문의 내용</h2>
        <p><strong>문의 유형:</strong> ${category}</p>
        <p><strong>연락처:</strong> ${contact}</p>
        <p><strong>문의 내용:</strong></p>
        <p>${content}</p>
      `
    };

    console.log('이메일 전송 시도:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    await transporter.sendMail(mailOptions);
    console.log('이메일 전송 성공');
    res.json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
  } catch (error) {
    console.error('이메일 전송 실패 - 상세 에러:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    res.status(500).json({
      success: false,
      message: '이메일 전송에 실패했습니다.',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log('환경 변수 확인:', {
    email: process.env.NAVER_EMAIL ? '설정됨' : '설정안됨',
    password: process.env.NAVER_PASSWORD ? '설정됨' : '설정안됨'
  });
});