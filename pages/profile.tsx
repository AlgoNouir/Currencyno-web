import Header from "@/components/header";
import Product from "@/components/product";
import { useAppSelector } from "@/store/HOCs";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const screens = [
    { id: 0, name: "سبد خرید", component: <ProductScreen /> },
    { id: 1, name: "تنظیمات", component: <SettingScreen /> },
];

export default function ProfilePage() {
    const [screen, screenHandler] = useState(screens[0]);
    return (
        <div className="h-screen relative pt-32">
            <div className="absolute top-0">
                <Header />
            </div>
            <div className="h-full p-5 flex flex-row space-x-5 rtl:space-x-reverse">
                <div className="w-96 h-full bg-bg-200 rounded-xl flex flex-col space-y-2 items-end py-5">
                    {screens.map((s, index) => (
                        <button
                            key={`screen-${index}`}
                            onClick={() => screenHandler(s)}
                            style={{
                                backgroundColor:
                                    s.id === screen.id ? "#4771AF" : "",
                                color:
                                    s.id === screen.id ? "#FFFFFF" : "#000000",
                            }}
                            className="w-5/6 p-5 rounded-r-full"
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
                <div className="w-full h">
                    <div className="w-full h-16 rounded-xl bg-bg-200 mb-5 flex items-center justify-center">
                        <p className="font-bold text-xl">{screen.name}</p>
                    </div>
                    <div className="h-full w-full">{screen.component}</div>
                </div>
            </div>
        </div>
    );
}

function ProductScreen() {
    const router = useRouter();
    const user = useAppSelector((store) => store.account.user);
    const products = useAppSelector((store) => store.products);
    if (user)
        return user.inCart.length === 0 ? (
            <div className="flex items-center justify-center h-full flex-col space-y-5 text-gray-600">
                <HiOutlineArchiveBoxXMark className="text-[150px]" />
                <p>در حال حاضر شما محصولی سفارش نداده اید</p>
                <button
                    onClick={() => router.push("/lists")}
                    className="bg-prime-100 p-5 rounded-xl"
                >
                    <p className="text-white">مشاهده لیست محصولات</p>
                </button>
            </div>
        ) : (
            <div
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                }}
                className="grid w-full gap-5"
            >
                {user.inCart.map((p, index) => {
                    const product = products.find((pp) => pp.id === p);
                    if (product)
                        return (
                            <div className="h-96">
                                <Product {...product} key={index} />
                            </div>
                        );
                })}
            </div>
        );
}
function Input(props: { title: string }) {
    return (
        <div className="flex flex-col space-y-2 mb-5">
            <label>{props.title}</label>
            <input
                type="text"
                className="bg-gray-100 p-3 rounded-xl outline-none w-full"
                placeholder={props.title + " را وارد کنید"}
            />
        </div>
    );
}

function SettingScreen() {
    return (
        <div className="h-fit w-full bg-white rounded-xl p-5 space-y-10 flex flex-row">
            <div className="w-1/2">
                <Input title="نام شخص" />
                <Input title="نام خانوادگی" />
                <Input title="کد ملی" />
                <Input title="ایمیل" />
                <div className="flex flex-col space-y-2 mb-5">
                    <label>آدرس</label>
                    <textarea className="bg-gray-100 p-3 rounded-xl outline-none w-full h-40" />
                </div>
            </div>
            <div className="w-1/2 justify-between flex flex-col items-end">
                <div></div>
                <button className="bg-prime-100 w-44 p-3 rounded-xl">
                    <p className="text-white text-lg">ذخیره تنظیمات</p>
                </button>
            </div>
        </div>
    );
}
