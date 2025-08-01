// server.js

// const http = require('http');

// // CORS 설정을 위한 헤더
// const headers = {
//   'Access-Control-Allow-Origin': "http://127.0.0.1:5500",
//   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
//   'Access-Control-Allow-Headers': 'Content-Type',
// };

// let data = { message: '여러분 화이팅!' };

// const server = http.createServer((req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }

//   if (req.method === 'GET') {
//     res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
//     res.end(JSON.stringify(data));
//   }

//   if (req.method === 'POST') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`받은 POST 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'PUT') {
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`업데이트된 데이터: ${body}`);
//     });
//   }

//   if (req.method === 'DELETE') {
//     data = {};
//     res.writeHead(200, headers);
//     res.end('데이터가 삭제되었습니다.');
//   }
// });

// server.listen(3000, () => {
//   console.log('서버가 http://localhost:3000/ 에서 실행 중입니다.');
// });

// ============================================
// exprss로 변환

const express = require("express");
const app = express();
const PORT = 3000;

const cors = require("cors");

let data = { message: "여러분 화이팅!" };

// cors
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// JSON 파싱을 위한 미들웨어
app.use(express.json());
app.use(express.text());

// get요청
app.get("/", (req, res) => {
  res.json(data);
});

// post요청
app.post("/", (req, res) => {
  data.message = req.body;
  res.send(`받은 POST 데이터: ${req.body}`);
});

// put요청
app.put("/", (req, res) => {
  data.message = req.body;
  res.send(`업데이트된 데이터: ${req.body}`);
});

// delete요청
app.delete("/", (req, res) => {
  data = {};
  res.send("데이터가 삭제되었습니다.");
});

app.listen(PORT, () => {
  console.log('서버가 http://localhost:3000/ 에서 실행 중입니다.');
});
