import { AiOutlineSearch } from "react-icons/ai";
import { PiBasketLight } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/HOCs";
import LoginModal from "../login";
import Image from "next/image";

export default function Header(props: { state: number }) {
    const user = useAppSelector((store) => store.account.user);
    const router = useRouter();
    const [loginModalOpen, loginModalOpenHandler] = useState("");

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== "undefined") {
                if (window.scrollY > lastScrollY) {
                    // if scroll down hide the navbar
                    setShow(false);
                } else {
                    // if scroll up show the navbar
                    setShow(true);
                }
                // remember current page location to use in the next move
                setLastScrollY(window.scrollY);
            }
        };
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);
    return (
        <>
            <div
                style={{
                    transitionDuration: "500ms",
                    transform: show ? "" : "translate(0, -80px)",
                }}
                className="fixed flex items-center justify-center w-screen bg-white top-0 h-36 z-20 shadow"
            >
                <div
                    className="bg-bg-200/50 container backdrop-blur-xl flex flex-col px-5
                    items-center space-y-5 pt-5"
                >
                    <div
                        style={{
                            justifyContent:
                                props.state === 0 ? "space-between" : "center",
                        }}
                        className="flex flex-row items-center justify-between w-full"
                    >
                        <div className="flex flex-row space-x-5 rtl:space-x-reverse items-center">
                            <button
                                onClick={() => router.push("/")}
                                className=" flex flex-row items-center space-x-5 rtl:space-x-reverse"
                            >
                                <Image
                                    src={
                                        "https://currencyno.storage.iran.liara.space/Core/CurrencynoIcon.png"
                                    }
                                    width="0"
                                    height="0"
                                    sizes="100wv"
                                    className="w-14 h-14 rounded-full"
                                    alt="icon"
                                />
                                <div>
                                    <p className="font-bold text-2xl ">
                                        کارنسینو
                                    </p>
                                    <small className="font-bold">
                                        فروشگاه آنلاین و مجموعه خدماتی
                                    </small>
                                </div>
                            </button>
                            {props.state === 0 ? (
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
                            ) : (
                                <></>
                            )}
                        </div>
                        {props.state === 0 ? (
                            <div className="flex flex-row space-x-5 rtl:space-x-reverse">
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
                                    {user === undefined ? (
                                        <></>
                                    ) : (
                                        <BsFillPersonFill className="text-2xl text-gray-600" />
                                    )}
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
                                                {Intl.NumberFormat(
                                                    "fa-IR"
                                                ).format(
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
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex flex-col items-end justify-end">
                        <div className="grid grid-cols-5 gap-5">
                            {[
                                { name: "محصولات دیجیتال", url: "/store/" },
                                { name: "کتابخانه اقتصادی", url: "/academy/" },
                                { name: "کافه کارآفرینی", url: "/coffee/" },
                                { name: "کاریابی و استخدام", url: "/work/" },
                                { name: "تعمیرات لپتاب، کنسول", url: "/fix/" },
                            ].map((txt, index) => (
                                <button
                                    key={index}
                                    disabled={index === props.state}
                                    onClick={() => router.push(txt.url)}
                                    className="flex flex-row items-end justify-center transition-all
                                    hover:border-b-4 hover:pb-2 disabled:border-b-4 disabled:pb-2
                                    border-prime-100 disabled:border-amber-400 disabled:drop-shadow-lg"
                                >
                                    <p className="text-xl p-1">{txt.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal
                message={loginModalOpen}
                handler={loginModalOpenHandler}
            />
        </>
    );
}
