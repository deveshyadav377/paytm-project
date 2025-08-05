<<<<<<< HEAD
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
=======
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{name}</h3>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                        type="number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={()=> {
                      axios.post("http://localhost:3000/api/v1/account/transfer", {
                            to: id,
                            amount
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}
>>>>>>> 6e6eb9b309d147b6a0a3faf103b04f0d875b971a
