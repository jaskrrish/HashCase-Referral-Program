import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { Domain } from "../utils/constants";

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
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const body = {
        userId: storedResponse.user.id,
        identifier: storedResponse.user.identifier,
      };
      try {
        setLoading(true);
        const response = await axios.post(`${Domain}/user/referrals`, body);
        console.log(response.data);
        if (response.data.referredto !== "No referrals yet") {
          setTableData(response.data.referredto);
        }
      } catch (error) {
        console.log("Referral failed", error);
        setLoading(false);
      } finally {
        setLoading(false);
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
              {tableData.map((referral, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {referral}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : loading ? (
        <LoaderCircle className="animate-spin text-white" />
      ) : (
        <div className="text-lg font-bold text-white">No Referral yet</div>
      )}
    </div>
  );
};

export default TotalReferral;
