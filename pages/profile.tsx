import Header from "@/components/header";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const screens = [
    { id: 0, name: "سبد خرید", component: <ProductScreen /> },
    { id: 1, name: "تنظیمات", component: <div></div> },
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
                    <div className="w-full h-16 rounded-xl bg-bg-200 flex items-center justify-center">
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
    return (
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
    );
}
