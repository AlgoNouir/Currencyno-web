import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { loginThunk, sendLoginSMS } from "@/store/account/thunk";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";
import Modal from "../UI/modal";
import Image from "next/image";

export function LoginComponent(props: { message: string }) {
  const [sms, smsHandler] = useState(false);
  const [code, codeHandler] = useState("");
  const [phone, phoneHandler] = useState<number | "" | 0>();
  const products = useAppSelector((store) => store.account.cartProduct);
  const loginStatus = useAppSelector((store) => store.account.login);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col space-y-5 items-center justify-center w-fit h-full">
      <Image
        src="https://currencyno.storage.iran.liara.space/Core/modals/login.jpg"
        width="0"
        height="0"
        sizes="100vw"
        className="sm:w-96 w-64"
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
          } p-3 rounded-xl sm:w-44 disabled:bg-black/30 flex flex-row h-full items-center justify-center
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
          className="space-x-2 flex flex-row w-full items-center justify-center"
        >
          <input
            disabled={loginStatus === "awaitSMS"}
            type="text"
            value={code}
            onChange={(e) => codeHandler(e.target.value)}
            className="disabled:bg-gray-100 bg-slate-200 px-5 py-2 w-full rounded-xl grow lg:w-64 h-full"
          />
          <button
            disabled={loginStatus === "awaitSMS"}
            onClick={() => {
              if (typeof phone === "number" && phone?.toString()[0] === "9") {
                dispatch(
                  loginThunk({
                    phone,
                    code,
                    products,
                  })
                );
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
            className="p-3 rounded-xl lg:w-44 w-full bg-prime-300 disabled:bg-black/30"
          >
            <p>تایید کد</p>
          </button>
        </div>
      ) : (
        <></>
      )}
      <p className="text-center text-gray-500 text-sm">{props.message}</p>
    </div>
  );
}

export default function LoginModal(props: { handler: any; message: string }) {
  const user = useAppSelector((store) => store.account.user);

  return (
    <Modal
      open={props.message && user === undefined}
      title="ورود به حساب کاربری"
      handler={props.handler}
    >
      <LoginComponent message={props.message} />
    </Modal>
  );
}
