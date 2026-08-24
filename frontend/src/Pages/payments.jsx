import { useEffect, useState } from "react";
import api from "../api/axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const response = await api.get("payments/");
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to load payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Payment History
      </h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">
            No payments found.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-xl p-6 overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Reference</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Phone</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">M-Pesa Receipt</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {payment.reference}
                  </td>

                  <td className="p-3">
                    KES {payment.amount}
                  </td>

                  <td className="p-3">
                    {payment.phone_number}
                  </td>

                  <td className="p-3">
                    {payment.status}
                  </td>

                  <td className="p-3">
                    {payment.mpesa_receipt_number || "-"}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Payments;