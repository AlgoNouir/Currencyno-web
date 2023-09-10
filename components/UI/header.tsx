import { AiOutlineSearch } from "react-icons/ai";
import { PiBasketLight } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/store/HOCs";
import LoginModal from "../login";
import Image from "next/image";
import { AutoComplete, Drawer, Dropdown, Menu } from "antd";
import { FiMenu } from "react-icons/fi";
import { menuDirector } from "../menu";
import MegaMenu from "../megamenu";

export default function Header(props: { state: number }) {
  const tmp = useAppSelector((store) => store.account);
  const user = tmp.user;
  const category = useAppSelector((store) => store.account.category);
  const router = useRouter();
  const [loginModalOpen, loginModalOpenHandler] = useState("");
  const [menu, menuHandler] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const test = useCallback(() => menuDirector(category), [category]);

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
        className="fixed flex items-center justify-center w-screen bg-white top-0 z-20 shadow left-0 right-0"
      >
        <div
          className=" md:container flex flex-col px-5 relative
                    items-center space-y-5 pt-5"
        >
          <div
            className={`flex flex-row items-center ${
              props.state === 0 ? "justify-between" : "justify-center"
            }  w-full`}
          >
            {props.state === 0 ? (
              <button
                onClick={() => menuHandler(true)}
                className="font-bold text-3xl md:hidden "
              >
                <FiMenu />
              </button>
            ) : (
              <></>
            )}
            <div className="flex flex-row space-x-5 rtl:space-x-reverse items-center">
              <button
                onClick={() => router.push("/")}
                className=" flex flex-row items-center space-x-1 rtl:space-x-reverse"
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
                  <p className="font-bold text-2xl -mb-1">کارنسینو</p>
                  <small className="md:font-bold text-[10px]">
                    فروشگاه آنلاین و مجموعه خدماتی
                  </small>
                </div>
              </button>
              {props.state === 0 ? (
                <div
                  className=" bg-slate-200 w-fit items-center
                                    space-x-3 rounded-xl p-1 rtl:space-x-reverse md:flex hidden"
                >
                  <AiOutlineSearch className="text-2xl text-gray-700" />

                  <SearchConsole />
                </div>
              ) : (
                <></>
              )}
            </div>
            {props.state === 0 ? (
              <div className="flex-row space-x-5 rtl:space-x-reverse flex">
                <button
                  className="relative flex flex-row items-center space-x-2 rtl:space-x-reverse lg:border-2 p-2 rounded-xl lg:shadow lg:px-5"
                  onClick={() => router.push("/profile")}
                >
                  <p className="hidden lg:flex font-bold">
                    {user === undefined
                      ? "سبد خرید"
                      : `${user.fName} ${user.lName}`}
                  </p>
                  <div className="relative">
                    {tmp.cartProduct.length > 0 ? (
                      <div
                        className="bg-red-600 rounded-full w-6 h-6
                                flex items-center justify-center absolute top-0 -left-3"
                      >
                        <label className="text-white">
                          {Intl.NumberFormat("fa-IR").format(
                            tmp.cartProduct.length || 0
                          )}
                        </label>
                      </div>
                    ) : (
                      <></>
                    )}
                    {user === undefined ? (
                      <PiBasketLight className="text-3xl" />
                    ) : (
                      <BsFillPersonFill className="text-4xl text-gray-600" />
                    )}
                  </div>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex-col items-center justify-center ">
            <div className="grid grid-cols-6 gap-5 relative">
              {[
                { name: "محصولات دیجیتال", url: "/" },
                { name: "کتابخانه اقتصادی", url: "/academy/" },
                { name: "کافه کارآفرینی", url: "/coffee/" },
                { name: "کاریابی استخدام", url: "/work/" },
                { name: "تعمیرات لپتاپ", url: "/fix/" },
                { name: "درباره ما", url: "/info/" },
              ].map((txt, index) =>
                index === 0 ? (
                  <div key={index} className="group flex flex-col">
                    <button
                      disabled={index === props.state}
                      onClick={() => router.push(txt.url)}
                      className="flex flex-row items-end justify-center transition-all
                    hover:border-b-4 hover:pb-2 disabled:border-b-4 disabled:pb-2
                    border-prime-100 disabled:border-amber-400 disabled:drop-shadow-lg"
                    >
                      <p className="sm:text-xl text-xs p-1">{txt.name}</p>
                    </button>
                    <MegaMenu />
                  </div>
                ) : (
                  <button
                    key={index}
                    disabled={index === props.state}
                    onClick={() => router.push(txt.url)}
                    className="flex flex-row items-end justify-center transition-all
                                    hover:border-b-4 hover:pb-2 disabled:border-b-4 disabled:pb-2
                                    border-prime-100 disabled:border-amber-400 disabled:drop-shadow-lg"
                  >
                    <p className="sm:text-xl text-xs p-1">{txt.name}</p>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer open={menu} onClose={() => menuHandler(false)}>
        <div className="space-y-5">
          <div className="flex flex-row space-x-5 rtl:space-x-reverse w-full justify-between">
            <button
              onClick={
                user === undefined
                  ? () => {
                      loginModalOpenHandler(
                        "برای ثبت نام یا ورود به حساب کاربری خود شماره موبایل خود را وارد کنید"
                      );
                      menuHandler(false);
                    }
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
                  : user.lName === undefined ||
                    user.fName === undefined ||
                    user.lName === undefined ||
                    user.email === undefined ||
                    user.address === undefined ||
                    user.lName === null ||
                    user.fName === null ||
                    user.lName === null ||
                    user.email === null ||
                    user.address === null
                  ? `${user.fName} ${user.lName}`
                  : ""}
              </p>
            </button>
          </div>
          <div
            className=" bg-slate-200 items-center w-full space-x-3
                    rounded-xl p-1 rtl:space-x-reverse flex"
          >
            <AiOutlineSearch className="text-2xl text-gray-700" />
            <SearchConsole />
          </div>
          <Menu
            onClick={(e) => {
              router.push(`/lists/${e.key}`);
              menuHandler(false);
            }}
            mode="inline"
            items={test()}
          />
        </div>
      </Drawer>
      <LoginModal message={loginModalOpen} handler={loginModalOpenHandler} />
    </>
  );
}

function SearchConsole() {
  const products = useAppSelector((store) => store.products);
  const [options, setOptions] = useState<{ value: string; id: number }[]>([]);
  const router = useRouter();

  return (
    <AutoComplete
      options={options}
      bordered={false}
      onSelect={(obj) => {
        router.push(
          `/product/${
            products.find((product) => product.persianName === obj)?.id
          }`
        );
        setOptions([]);
      }}
      onSearch={(text) =>
        setOptions(
          products
            .filter((p) => p.persianName.includes(text))
            .map((p) => ({ value: p.persianName, id: p.id }))
        )
      }
      placeholder="محصول خود را جست و جو کنید ..."
      className="outline-none p-2 w-full lg:w-96"
    />
  );
}
