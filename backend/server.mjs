import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Настройка CORS с разрешением запросов с вашего фронтенда
const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // Преобразование пароля в строку
});

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Backend сервер работает на порту ' + port);
});

// Маршрут регистрации пользователя
app.post('/api/register', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
  }

  try {
    // Проверка, существует ли пользователь с таким email
    const userCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
    }

    console.log('Полученные данные:', { username, email, password });
    console.log('Хэширование пароля начато...');

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Добавление пользователя в базу данных
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    console.error(error.stack);

    // Дополнительное логирование для диагностики
    if (error.code) {
      console.error('Код ошибки базы данных:', error.code);
    }
    if (error.detail) {
      console.error('Детали ошибки базы данных:', error.detail);
    }
    if (error.hint) {
      console.error('Подсказка по ошибке базы данных:', error.hint);
    }

    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Маршрут входа пользователя
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
  }

  try {
    // Проверка существования пользователя
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    res.status(200).json({ message: 'Вход выполнен успешно', user: user.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/api/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    res.status(200).json({ message: 'Подключение к базе данных успешно', result: result.rows });
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
    res.status(500).json({ message: 'Ошибка подключения к базе данных', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен и слушает порт ${port}`);
});
