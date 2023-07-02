import { useAppSelector } from "@/store/HOCs";
import { useRouter } from "next/router";

export default function FactorPage() {
    const user = useAppSelector((store) => store.account.user);
    const products = useAppSelector((store) => store.products);
    const router = useRouter();
    if (user)
        return (
            <div
                className="flex flex-row items-center h-screen p-14
            justify-between space-x-5 rtl:space-x-reverse"
            >
                <div className="bg-white w-1/2 h-full rounded-xl"></div>
                <div
                    className="bg-white w-1/2 h-full rounded-xl
                p-5 flex flex-col"
                >
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <p className="text-2xl font-bold">
                                {Intl.NumberFormat("fa-IR").format(
                                    user.products.reduce(
                                        (obj, cart) =>
                                            obj +
                                            (products.find(
                                                (product) => product.id === cart
                                            )?.price || 0),
                                        0
                                    )
                                )}
                            </p>
                            <p className="text-gray-800">تومان</p>
                        </div>
                        <button
                            onClick={() => {
                                router.push("/");
                            }}
                            className="bg-green-600 px-7 py-2 rounded-xl text-white"
                        >
                            پرداخت و ثبت سفارش
                        </button>
                    </div>
                </div>
            </div>
        );
}
