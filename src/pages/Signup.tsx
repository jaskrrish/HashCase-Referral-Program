import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  phoneNumber: string;
}

const Signup = () => {
  function notify(message: string) {
    toast(message);
  }

  const router = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    phoneNumber: "",
  });

  const onSignup = async () => {
    try {
      const headers = {
        "x-api-key": "ebee0446e8c737d6",
      };

      const body = {
        owner_id: 1,
        email: user.email,
        identifier: user.phoneNumber,
      };

      const response = await axios.post(
        "https://cbb7-110-224-92-238.ngrok-free.app/dev/register-user",
        body,
        { headers }
      );
      console.log("Signup success", response.data);
      localStorage.setItem("responseData", JSON.stringify(response.data));
      notify(response.data.message);
      setTimeout(() => {
        router("/referral");
      }, 5000);
    } catch (error) {
      console.log("Signup failed", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-md border-2 text-white p-8 rounded-md shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 font-serif">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline font-serif"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="Phone Number"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline font-serif"
              id="phone number"
              type="text"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              placeholder="123456"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-white hover:bg-gray-200 text-black font-serif font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onSignup}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
