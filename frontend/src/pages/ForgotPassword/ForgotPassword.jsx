// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from '../../api/axios';

function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const errors = [];
    if (!/.com/.test(email)) errors.push('com.');
    if (!/@/.test(email)) errors.push('@');
    return errors;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const validationErrors = validateEmail(value);
    if (value && validationErrors.length > 0) {
      setError(`ایمیل باید شامل ${validationErrors.join(' و ')} باشد.`);
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const errors = validateEmail(email);
    if (errors.length > 0) {
      setError(`ایمیل باید شامل ${errors.join(' و ')} باشد.`);
      setLoading(false);
      return;
    }

    axios.post('/forgot-password', { email })
      .then(res => {
        if (res.data.Status === "Success") {
          setMessage("ایمیل بازیابی با موفقیت ارسال شد.");
          setError('');
        } else {
          setError("ارسال ایمیل با خطا مواجه شد.");
        }
      })
      .catch((err) => {
        console.error('خطا در پاسخ:', err);
        setError("خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] max-w-full mx-4 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold transition"
        >
          &times;
        </button>

        <h4 className="text-center text-blue-500 font-bold mb-4">بازیابی رمز عبور</h4>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="w-full border px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} transition`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>در حال ارسال...</span>
              </div>
            ) : (
              "ارسال ایمیل بازیابی"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
