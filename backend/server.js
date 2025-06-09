const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Пример маршрута для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Backend сервер работает на порту ' + port);
});

app.listen(port, () => {
  console.log(`Сервер запущен и слушает порт ${port}`);
});
