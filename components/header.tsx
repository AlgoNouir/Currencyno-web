import { AiOutlineSearch, AiOutlineArrowLeft } from "react-icons/ai";
import { PiBasketLight } from "react-icons/pi";
import { BsFillPersonFill, BsTelephone } from "react-icons/bs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppSelector } from "@/store/HOCs";

function LoginModal(props: { handler: any; message: string }) {
    return (
        <div
            className="absolute z-10 h-screen top-0 w-screen 
            backdrop-blur flex items-center justify-center bg-black/10"
        >
            <div
                className="bg-white pb-5 rounded-xl relative
                space-y-5 flex flex-col items-center px-5"
            >
                <div className="flex flex-row items-center justify-center p-5">
                    <button
                        onClick={() => props.handler("")}
                        className="absolute left-5"
                    >
                        <AiOutlineArrowLeft className="text-xl" />
                    </button>
                    <p>ورود به حساب کاربری</p>
                </div>
                <div
                    style={{ direction: "ltr" }}
                    className="space-x-2 flex flex-row w-fit"
                >
                    <div
                        className="flex bg-slate-200 items-center
                        space-x-5 rounded-xl pl-3 rtl:space-x-reverse w-full"
                    >
                        <BsTelephone className="text-xl text-gray-700" />
                        <input
                            type="text"
                            className="outline-none bg-slate-200 p-2 w-full"
                        />
                    </div>
                    <button className="bg-green-400 p-3 rounded-xl w-44">
                        دریافت کد تایید
                    </button>
                </div>
                <p className="text-center text-gray-500 text-sm">
                    {props.message}
                </p>
            </div>
        </div>
    );
}

export default function Header() {
    const user = useAppSelector((store) => store.account.user);
    const router = useRouter();
    const [loginModalOpen, loginModalOpenHandler] = useState("");
    return (
        <div className="relative">
            <div className="bg-white flex flex-col px-5 items-center space-y-5 pt-5">
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row space-x-5 rtl:space-x-reverse">
                        <button
                            onClick={() => router.push("/")}
                            className="w-12 h-12 bg-red-300 rounded-full"
                        ></button>
                        <div
                            className="flex bg-slate-200 w-fit items-center
                            space-x-3 rounded-xl p-1 rtl:space-x-reverse"
                        >
                            <AiOutlineSearch className="text-2xl text-gray-700" />
                            <input
                                placeholder="محصول خود را جست و جو کنید ..."
                                type="text"
                                className="outline-none bg-slate-200 p-2 w-96"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-5 rtl:space-x-reverse ">
                        <button
                            onClick={() =>
                                loginModalOpenHandler(
                                    "برای ثبت نام یا ورود به حساب کاربری خود شماره موبایل خود را وارد کنید"
                                )
                            }
                            className="border p-3 rounded-xl flex flex-row space-x-3 
                            rtl:space-x-reverse items-center"
                        >
                            <BsFillPersonFill className="text-2xl text-gray-600" />
                            <p>ورود یا ثبت نام</p>
                        </button>
                        <button
                            onClick={
                                user === undefined
                                    ? () =>
                                          loginModalOpenHandler(
                                              "برای مشاهده سبد خرید خود وارد شوید یا ثبت نام کنید"
                                          )
                                    : () => router.push("")
                            }
                        >
                            <PiBasketLight className="text-3xl" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-end h-9">
                    <div className="grid grid-cols-4 gap-5">
                        <button
                            onClick={() => router.push("lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-green-500 transition-all"
                        >
                            <p className="text-xl p-1">محصولات دیجیتال</p>
                        </button>
                        <button
                            onClick={() => router.push("lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-green-500 transition-all"
                        >
                            <p className="text-xl p-1">کتابخانه اقتصادی</p>
                        </button>
                        <button
                            onClick={() => router.push("lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-green-500 transition-all"
                        >
                            <p className="text-xl p-1">کافه کارآفرینی</p>
                        </button>
                        <button
                            onClick={() => router.push("lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-green-500 transition-all"
                        >
                            <p className="text-xl p-1">یک موضوع تست</p>
                        </button>
                    </div>
                </div>
            </div>
            {loginModalOpen !== "" ? (
                <LoginModal
                    message={loginModalOpen}
                    handler={loginModalOpenHandler}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
