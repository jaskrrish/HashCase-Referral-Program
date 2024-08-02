import React, { useEffect, useState } from "react";
import axios from "axios";

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

const TotalReferral = () => {
  const storedResponse: ResponseData = JSON.parse(
    localStorage.getItem("responseData") || "{}"
  );

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        userId: storedResponse.user.id,
        identifier: storedResponse.user.identifier,
      };
      try {
        const response = await axios.post(
          `https://cbb7-110-224-92-238.ngrok-free.app/user/referrals`,
          body
        );
        console.log(response.data);
        if (response.data.referredto !== "No referrals yet") {
          setTableData(response.data.referredto);
        }
      } catch (error: any) {
        console.log("Referral failed", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {tableData.length ? (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            User Details
          </h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200">jas</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-lg font-bold text-white">No Referral yet</div>
      )}
    </div>
  );
};

export default TotalReferral;
