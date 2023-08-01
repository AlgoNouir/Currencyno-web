import { axiosNoUser } from "@/core/axios";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { loginThunk } from "@/store/account/thunk";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";

export default function LoginModal(props: { handler: any; message: string }) {
  const [sms, smsHandler] = useState(false);
  const [code, codeHandler] = useState("");
  const [phone, phoneHandler] = useState<number | "">();
  const products = useAppSelector((store) => store.account.products);
  const dispatch = useAppDispatch();
  return props.message === "" ? (
    <></>
  ) : (
    <div
      className="fixed h-screen top-0 w-screen z-50 bottom-0 left-0 right-0
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
        <div className="flex flex-col space-y-5 items-center justify-center">
          <div
            style={{ direction: "ltr" }}
            className="space-x-2 flex flex-row w-fit"
          >
            <PhoneInput value={phone} handler={phoneHandler} />
            <button
              disabled={sms}
              onClick={() => {
                if (typeof phone === "number") {
                  axiosNoUser
                    .post("login/", { phone })
                    .then(() => smsHandler(true))
                    .catch((error) => console.log(error));
                }
              }}
              className={`${
                sms ? "bg-prime-200 " : "bg-green-400"
              } p-3 rounded-xl w-44 disabled:bg-black/30`}
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
                <input
                  type="text"
                  value={code}
                  onChange={(e) => codeHandler(e.target.value)}
                  className="outline-none bg-slate-200 p-2 w-full"
                />
              </div>
              <button
                onClick={() => {
                  if (
                    typeof phone === "number" &&
                    phone?.toString()[0] === "9"
                  ) {
                    dispatch(
                      loginThunk({
                        phone,
                        code,
                        products,
                      })
                    );
                    props.handler("");
                    smsHandler(false);
                  } else {
                    dispatch(
                      setNotif({
                        type: "error",
                        title: "خطای شماره تلفن",
                        message: "لطفا شماره تلفن خود را به درستی وارد کنید",
                      })
                    );
                  }
                }}
                className="p-3 rounded-xl w-44 bg-prime-300"
              >
                <p>تایید کد</p>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <p className="text-center text-gray-500 text-sm">{props.message}</p>
      </div>
    </div>
  );
}
