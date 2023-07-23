import { axiosUser } from "@/core/axios";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { setNotif } from "@/store/core/slice";
import { cartToOrderThunk } from "@/store/order/thunk";
import { useRouter } from "next/router";

export default function FactorPage() {
    // main
    const router = useRouter();

    // resdux
    const user = useAppSelector((store) => store.account.user);
    const products = useAppSelector((store) => store.products);
    const dispatch = useAppDispatch();

    if (user)
        return (
            <div
                className="flex flex-row items-center h-screen p-14
            justify-between space-x-5 rtl:space-x-reverse"
            >
                <div className="space-y-5 w-1/2 h-full rounded-xl overflow-scroll">
                    {user.products.map((item) => {
                        const product = products.find(
                            (p) => p.id === item.product
                        );
                        if (product)
                            return (
                                <div className="bg-white rounded-xl space-y-5 p-5 flex flex-col">
                                    <div>
                                        <p className="text-xl font-bold">
                                            {product.persianName}
                                        </p>
                                        <p className="text-gray-700">
                                            {product.englishName}
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div></div>
                                        <div className="flex flex-row items-center space-x-2 rtl:space-x-reverse">
                                            <p className="text-lg font-bold">
                                                {Intl.NumberFormat(
                                                    "fa-IR"
                                                ).format(
                                                    product.price * item.count
                                                )}
                                            </p>
                                            <small className="text-gray-700">
                                                تومان
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            );
                    })}
                </div>
                <div
                    className="bg-white w-1/2 h-full rounded-xl
                    p-5 flex flex-col justify-end"
                >
                    <div className="w-full flex items-end justify-between">
                        <div className="flex flex-col space-y-2">
                            <small>مجموع :</small>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                <p className="text-2xl font-bold">
                                    {Intl.NumberFormat("fa-IR").format(
                                        user.products.reduce(
                                            (obj, cart) =>
                                                obj +
                                                (products.find(
                                                    (product) =>
                                                        product.id ===
                                                        cart.product
                                                )?.price || 0) *
                                                    cart.count,
                                            0
                                        )
                                    )}
                                </p>
                                <p className="text-gray-800">تومان</p>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-2 rtl:space-x-reverse">
                            <button
                                onClick={() => {
                                    router.back();
                                }}
                                className="bg-red-600 px-7 py-2 rounded-xl text-white"
                            >
                                بازگشت
                            </button>
                            <button
                                onClick={async () => {
                                    const response = await axiosUser
                                        .post("test/")
                                        .then((res) =>
                                            router.push(res.data.url)
                                        )
                                        .catch((error) =>
                                            console.log(error.response.data)
                                        );
                                }}
                                className="bg-green-600 px-7 py-2 rounded-xl text-white"
                            >
                                پرداخت و ثبت سفارش
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
}
