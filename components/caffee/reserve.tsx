import Image from "next/image";
import Modal from "../UI/modal";
import Input from "../UI/input";
import { useAppDispatch } from "@/store/HOCs";
import { coffeeOrderThunk } from "@/store/core/thunk";
import { useState } from "react";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";

export default function ReserveModal(props: { handler: any; open: boolean }) {
  const dispatch = useAppDispatch();
  const [name, nameHandler] = useState("");
  const [desc, descHandler] = useState("");
  const [phone, phoneHandler] = useState<number | "">();

  return (
    <Modal {...props} title="رزرو کافه کارآفرینی">
      <div className="lg:space-x-5 space-y-5 flex flex-col lg:flex-row items-center justify-between w-5/6 rtl:space-x-reverse">
        <div className="flex flex-col space-y-5 items-center">
          <div className="w-96">
            <Image
              src="https://currencyno.storage.iran.liara.space/Banners/caffeh/topBanners/reserveCaffee.jpg"
              width="0"
              height="0"
              sizes="100vw"
              alt="reserve"
              className="h-auto w-full opacity-50"
            />
          </div>
          <label className="text-center text-xl font-bold text-gray-600">
            جهت رزرو کافه یا سفارش کارآفرینی برای مراسمات جلسات کاری و تولد و
            ایونت های مافیا مشخصات خود را وارد کنید
          </label>
        </div>
        <div className="flex flex-col space-y-5 items-center">
          <div className="space-y-5">
            <Input
              value={name}
              handler={nameHandler}
              title="نام و نام خانوادگی"
            />
            <PhoneInput
              value={phone}
              handler={phoneHandler}
              title="شماره تلفن"
            />
            <div className="flex flex-col space-y-2">
              <label className="text-xl">توضیحات برای سفارش شما</label>
              <textarea
                value={desc}
                onChange={(e) => descHandler(e.target.value)}
                className="bg-gray-100 p-5 rounded-xl 2xl:w-96 w-80"
                placeholder="توضیحات سفارش یا رزرو"
              />
            </div>
          </div>
          <button
            onClick={() => {
              if (phone !== undefined && name !== undefined && phone !== "") {
                dispatch(coffeeOrderThunk({ name, phone, desc: desc || "" }));
                props.handler(false);
                nameHandler("");
                phoneHandler("");
              } else {
                dispatch(
                  setNotif({
                    type: "error",
                    title: "مشکل در ارسال اطلاعات",
                    message: "لطفا همه فیلد ها را به درستی پر کنید",
                  })
                );
              }
            }}
            className="bg-amber-400 p-5 rounded-xl w-44 text-xl"
          >
            ارسال درخواست
          </button>
        </div>
      </div>
    </Modal>
  );
}
