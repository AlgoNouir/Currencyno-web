import { AiOutlineSearch, AiOutlineArrowLeft } from "react-icons/ai";
import { PiBasketLight } from "react-icons/pi";
import { BsFillPersonFill, BsTelephone } from "react-icons/bs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { axiosNoUser } from "@/core/axios";
import { loginThunk } from "@/store/account/thunk";

function LoginModal(props: { handler: any; message: string }) {
    const [sms, smsHandler] = useState(false);
    const [code, codeHandler] = useState("");
    const [phone, phoneHandler] = useState<string | undefined>();

    const dispatch = useAppDispatch();
    return (
        <div
            className="absolute z-10 h-screen top-0 w-screen 
            backdrop-blur flex items-center justify-center bg-black/10"
        >
            <div
                className="bg-bg-200 pb-5 rounded-xl relative
                space-y-5 flex flex-col items-center px-5"
            >
                <div className="flex flex-row items-center justify-center p-5">
                    <button
                        onClick={() => {
                            props.handler("");
                            smsHandler(false);
                        }}
                        className="absolute left-5"
                    >
                        <AiOutlineArrowLeft className="text-xl" />
                    </button>
                    <p>ورود به حساب کاربری</p>
                </div>
                <div className="flex flex-col space-y-5">
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
                                value={phone}
                                onChange={(e) =>
                                    phoneHandler("0" + parseInt(e.target.value))
                                }
                                className="outline-none bg-slate-200 p-2 w-full"
                            />
                        </div>
                        <button
                            disabled={sms}
                            onClick={
                                sms
                                    ? () => {}
                                    : () => {
                                          axiosNoUser
                                              .get("user/")
                                              .catch(() =>
                                                  console.log("error")
                                              );
                                          smsHandler(true);
                                      }
                            }
                            className={`${
                                sms ? "bg-prime-200 " : "bg-green-400"
                            } p-3 rounded-xl w-44`}
                        >
                            <p>{sms ? "ارسال مجدد" : "دریافت کد تایید"}</p>
                        </button>
                    </div>
                    {sms ? (
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
                                    value={code}
                                    onChange={(e) =>
                                        codeHandler(e.target.value)
                                    }
                                    className="outline-none bg-slate-200 p-2 w-full"
                                />
                            </div>
                            <button
                                onClick={
                                    sms
                                        ? () => {
                                              dispatch(loginThunk({ code }));
                                              props.handler("");
                                              smsHandler(false);
                                          }
                                        : () => {}
                                }
                                className="p-3 rounded-xl w-44 bg-prime-300"
                            >
                                <p>تایید کد</p>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
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
            <div className="bg-bg-200/50 backdrop-blur-xl shadow flex flex-col px-5 w-screen items-center space-y-5 pt-5">
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
                            onClick={
                                user === undefined
                                    ? () =>
                                          loginModalOpenHandler(
                                              "برای ثبت نام یا ورود به حساب کاربری خود شماره موبایل خود را وارد کنید"
                                          )
                                    : () => router.push("/profile/")
                            }
                            className="border p-3 rounded-xl flex flex-row space-x-3 
                            rtl:space-x-reverse items-center"
                        >
                            <BsFillPersonFill className="text-2xl text-gray-600" />
                            <p>
                                {user === undefined
                                    ? "ورود یا ثبت نام"
                                    : `${user.fName} ${user.lName}`}
                            </p>
                        </button>
                        <button
                            className="relative"
                            onClick={
                                user === undefined
                                    ? () =>
                                          loginModalOpenHandler(
                                              "برای مشاهده سبد خرید خود وارد شوید یا ثبت نام کنید"
                                          )
                                    : () => router.push("/profile")
                            }
                        >
                            {user?.products || 0 > 0 ? (
                                <div
                                    className="bg-red-600 rounded-full w-6 h-6 
                                flex items-center justify-center absolute top-0 -right-3"
                                >
                                    <label className="text-white">
                                        {Intl.NumberFormat("fa-IR").format(
                                            user?.products.length || 0
                                        )}
                                    </label>
                                </div>
                            ) : (
                                <></>
                            )}
                            <PiBasketLight className="text-3xl" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-end h-9">
                    <div className="grid grid-cols-4 gap-5">
                        <button
                            onClick={() => router.push("/lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-prime-100 transition-all"
                        >
                            <p className="text-xl p-1">محصولات دیجیتال</p>
                        </button>
                        <button
                            onClick={() => router.push("/lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-prime-100 transition-all"
                        >
                            <p className="text-xl p-1">کتابخانه اقتصادی</p>
                        </button>
                        <button
                            onClick={() => router.push("/lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-prime-100 transition-all"
                        >
                            <p className="text-xl p-1">کافه کارآفرینی</p>
                        </button>
                        <button
                            onClick={() => router.push("/lists/")}
                            className="flex flex-row items-end justify-center 
                            hover:border-b-2 hover:pb-2 border-prime-100 transition-all"
                        >
                            <p className="text-xl p-1">کاریابی و استخدام</p>
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
