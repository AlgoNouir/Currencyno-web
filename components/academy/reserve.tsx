import Image from "next/image";
import Modal from "../UI/modal";
import Input from "../UI/input";
import { useState } from "react";
import { useAppDispatch } from "@/store/HOCs";
import { academyOrderThunk } from "@/store/core/thunk";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";

export default function ReserveModal(props: { handler: any; open: boolean }) {
  const dispatch = useAppDispatch();
  const [name, nameHandler] = useState("");
  const [phone, phoneHandler] = useState<number | "">();
  const [nationalCode, nationalCodeHandler] = useState<number>();
  const [birthday, birthdayHandler] = useState<number>();
  return (
    <Modal {...props} title="درخواست استفاده از فضای کار اشتراکی">
      <div className="space-x-5 flex flex-row items-center justify-between w-5/6 rtl:space-x-reverse">
        <div className="flex flex-col space-y-5">
          <Image
            src="https://currencyno.storage.iran.liara.space/Core/academy/reserveAcademy.jpg"
            width="0"
            height="0"
            sizes="100vw"
            alt="reserve"
            className="h-auto w-full opacity-50"
          />
          <label className="text-center text-xl font-bold text-gray-600">
            آکادمی اقتصادی کارنسینو (خانه اقتصاد) دارای فضای اشتراکی کاری و
            کتابخانه اقتصادی توسعه دهندگان، علاقه مندان بازار های مالی و دیگر
            اشخاص کارآفرین می باشد
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
            <Input
              value={nationalCode}
              handler={nationalCodeHandler}
              title="کد پستی"
            />
            <Input
              value={birthday}
              handler={birthdayHandler}
              title="تاریخ تولد"
            />
          </div>
          <button
            onClick={() => {
              if (name && name !== "" && phone !== undefined && phone !== "") {
                dispatch(
                  academyOrderThunk({
                    name,
                    phone,
                    birthday,
                    nationalCode,
                  })
                );
                props.handler(false);
                nameHandler("");
                phoneHandler(undefined);
                birthdayHandler(undefined);
                nationalCodeHandler(undefined);
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
