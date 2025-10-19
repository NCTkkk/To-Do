import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <p className="text-gray-500 mb-4">
          (Tạm thời chưa làm — click để quay lại đăng nhập)
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
