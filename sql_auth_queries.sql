-- Запрос для регистрации нового пользователя (вставка данных)
-- Предполагается, что пароль уже захеширован на стороне приложения

INSERT INTO users (username, email, password, created_at)
VALUES ($1, $2, $3, NOW())
RETURNING id;

-- Запрос для получения данных пользователя по email при входе
-- Используется для проверки существования пользователя и получения хеша пароля

SELECT id, username, email, password
FROM users
WHERE email = $1;
