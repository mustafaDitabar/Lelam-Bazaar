import React, { useState } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';

function ResetPassword({ onClose = () => {} }) {
  const { id, token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('حداقل ۸ کاراکتر');
    if (!/\d/.test(password)) errors.push('عدد');
    if (!/[!@#$%^&*]/.test(password)) errors.push('علامت خاص');
    return errors;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (isSubmitted) {
      const validationErrors = validatePassword(value);
      setError(validationErrors.length > 0 ? `رمز عبور باید شامل: ${validationErrors.join('، ')} باشد.` : '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setError(`رمز عبور باید شامل: ${validationErrors.join('، ')} باشد.`);
      return;
    }

    setLoading(true);
    axios.post(`/reset-password/${id}/${token}`, { password })
      .then(res => {
        if (res.data.Status === "Success") {
          setMessage("رمز عبور با موفقیت تغییر کرد.");
          setError('');
          setTimeout(() => onClose(), 3000);
        } else {
          setError("خطا در تغییر رمز عبور.");
        }
      })
      .catch(err => {
        const msg = err.response?.data?.message || "مشکلی در ارتباط با سرور پیش آمد.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  };

  setTimeout(() => {
    onClose();
  }, 3000);

  return (
    <div className="fixed inset-0 bgBlueGradient bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>

        <h4 className="text-center text-blue-400 font-bold mb-4">رمز عبور جدید</h4>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="رمز عبور جدید را وارد کنید"
            className="w-full p-2 border textInput rounded mb-4"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`cynBtn mr-6 text-white ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>در حال ارسال...</span>
              </div>
            ) : (
              "بروزرسانی"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
