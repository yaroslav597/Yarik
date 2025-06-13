import React, { useState } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Ошибка регистрации');
      } else {
        setSuccessMessage('Регистрация прошла успешно!');
        setUsername('');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setErrorMessage('Ошибка сети. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
