import React from "react";
import hashCaseLogo from "../../public/hashcaselogo.png";
import { Copy } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface User {
  badges: string;
  id: number;
  email: string;
  eth_wallet_address: string;
  owner_id: number;
  identifier: string;
  private_key: string;
  referral_code: string;
  updatedAt: string;
  createdAt: string;
}

interface ResponseData {
  user: User;
}

const Home = () => {
  const storedResponse: ResponseData = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );
  console.log(storedResponse);

  function notify(message: string) {
    toast(message);
  }

  function copyClipboard() {
    navigator.clipboard
      .writeText(storedResponse.user.referral_code)
      .then(() => {
        notify("Referral code copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="flex justify-center">
        <img
          src={hashCaseLogo}
          alt="HashCase Text Logo"
          className="h-20 w-20"
        />
      </div>
      {storedResponse.user ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Join the <span className="text-[#CFA9FB]">HashCase</span> <br />{" "}
            Referral Program
          </h1>
          <button className="px-4 py-2 bg-gray-100 text-black font-semibold text-lg tracking-wide">
            {storedResponse.user.referral_code} <Copy onClick={copyClipboard} />
          </button>
        </div>
      ) : (
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Join the <span className="text-[#CFA9FB]">HashCase</span> <br />{" "}
          Referral Program
        </h1>
      )}

      <Toaster />
    </div>
  );
};

export default Home;
