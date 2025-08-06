import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import { Appbar } from '../components/Appbar';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate(); 
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleTransfer = async () => {
        setError("");
        setMessage("");

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError("Please enter a valid amount greater than ₹0.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("https://paytm-backend-p8ix.onrender.com/api/v1/account/transfer", {
                to: id,
                amount: Number(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            setMessage("Transfer successful!");

            // Delay and then navigate to dashboard
            setTimeout(() => {
                navigate("/dashboard"); // 👈 back to dashboard
            }, 1500); // Optional 1.5s delay to let user see success message

        } catch (err) {
            setError(err.response?.data?.message || "Transfer failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Appbar />
            <div className="flex justify-center items-center h-[calc(100vh-56px)] bg-gray-100 px-4">
                <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-6 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-semibold">
                            {name?.[0]?.toUpperCase()}
                        </div>
                        <div className="text-lg font-semibold text-gray-800">{name}</div>
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                            Amount (in ₹)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm"
                        />
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {message && <p className="text-sm text-green-600">{message}</p>}

                    <button
                        onClick={handleTransfer}
                        disabled={loading}
                        className={`w-full py-2 rounded-md text-white text-sm font-semibold transition-colors 
                            ${loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
                    >
                        {loading ? "Processing..." : "Initiate Transfer"}
                    </button>

                    {/* Optional: Manual Back Button */}
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full mt-2 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-50 text-sm font-semibold"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </>
    );
};
