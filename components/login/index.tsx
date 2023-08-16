import { axiosNoUser } from "@/core/axios";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { loginThunk, sendLoginSMS } from "@/store/account/thunk";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";
import Modal from "../UI/modal";
import Image from "next/image";

export default function LoginModal(props: { handler: any; message: string }) {
  const [sms, smsHandler] = useState(false);
  const [code, codeHandler] = useState("");
  const [phone, phoneHandler] = useState<number | "">();
  const products = useAppSelector((store) => store.account.products);
  const loginStatus = useAppSelector((store) => store.account.login);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={props.message}
      title="ورود به حساب کاربری"
      handler={props.handler}
    >
      <div className="flex flex-col space-y-5 items-center justify-center w-fit h-full">
        <Image
          src="https://currencyno.storage.iran.liara.space/Core/modals/login.jpg"
          width="0"
          height="0"
          sizes="100vw"
          className="sm:w-96 w-full"
          alt=""
        />
        <div
          style={{ direction: "ltr" }}
          className="sm:space-x-2 space-y-5 sm:space-y-0 flex sm:flex-row w-fit flex-col items-center"
        >
          <PhoneInput value={phone} handler={phoneHandler} />
          <button
            disabled={sms}
            onClick={() => {
              if (typeof phone === "number" && phone.toString().length === 10) {
                smsHandler(true);
                dispatch(sendLoginSMS({ phone }));
              } else {
                dispatch(
                  setNotif({
                    title: "خطای شماره تلفن",
                    message: "شماره تلفن خود را به درستی وارد کنید",
                    type: "info",
                  })
                );
              }
            }}
            className={`${
              sms ? "bg-prime-200 " : "bg-green-400"
            } p-3 rounded-xl sm:w-44 disabled:bg-black/30 flex flex-row items-center justify-center
            space-x-2 w-full`}
          >
            <p>
              {loginStatus === "awaitSMS"
                ? "در حال ارسال پیامک"
                : sms
                ? "ارسال مجدد"
                : "دریافت کد تایید"}
            </p>
            {loginStatus === "awaitSMS" ? (
              <CgSpinner className="animate-spin text-2xl" />
            ) : (
              <></>
            )}
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
                if (typeof phone === "number" && phone?.toString()[0] === "9") {
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
        <p className="text-center text-gray-500 text-sm">{props.message}</p>
      </div>
    </Modal>
  );
}
