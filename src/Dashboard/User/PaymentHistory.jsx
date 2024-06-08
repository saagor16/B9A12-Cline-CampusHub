import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold mb-6">Payment History</h2>
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4">Total Payments: {payments.length}</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="min-w-full bg-white rounded-lg">
                        {/* head */}
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="py-3 px-6 text-left">#</th>
                                <th className="py-3 px-6 text-left">Price</th>
                                <th className="py-3 px-6 text-left">Transaction Id</th>
                                <th className="py-3 px-6 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="border-b hover:bg-gray-100">
                                    <td className="py-4 px-6">{index + 1}</td>
                                    <td className="py-4 px-6">${payment.price}</td>
                                    <td className="py-4 px-6">{payment.transactionId}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-sm ${payment.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
