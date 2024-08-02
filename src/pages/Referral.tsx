import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Referral = () => {
  const router = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const storedResponse = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );

  function notify(message: string) {
    toast(message);
  }

  const handleReferral = async () => {
    try {
      const body = {
        user_id: storedResponse.user.id,
        referral_code: referralCode,
      };
      console.log(body);

      const response = await axios.post(
        "https://cbb7-110-224-92-238.ngrok-free.app/user/add-referral",
        body
      );
      console.log(response.data);
      notify(response.data.message);
      localStorage.setItem("referralResponse", JSON.stringify(response.data));
      setTimeout(() => {
        router("/");
      }, 5000);
    } catch (error) {
      console.log("Referral failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white/10 backdrop-blur-md border-2 p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">
          Refer to Earn Rewards{" "}
        </h2>
        <form>
          <div className="mb-6">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="Referral"
            >
              Referral
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline font-serif"
              id="Referral"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="HA2XC"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleReferral}
            >
              Use the Referral
            </button>
            <Link
              to="/"
              className="text-gray-200 flex gap-x-2 my-2 text-lg items-center font-semibold"
            >
              Want to Skip this <ArrowRight />
            </Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Referral;
