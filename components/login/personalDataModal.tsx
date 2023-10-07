import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import Modal from "../UI/modal";
import { useState } from "react";
import Input from "../UI/input";
import { changeAccountDataThunk } from "@/store/account/thunk";
import { notifType, setNotif } from "@/store/core/slice";

export function persianValidator(text: string) {
  return !/(?=[^\u0600-\u06FF\s])/g.test(text);
}

export function emailValidator(text: string) {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/g.test(text);
}

export default function PersonalModal(props: { open: boolean; handler: any }) {
  // redux
  const user = useAppSelector((store) => store.account.user);
  const dispatch = useAppDispatch();

  // states
  const [name, nameHandler] = useState(user?.fName || "");
  const [family, familyHandler] = useState(user?.lName || "");
  const [nationalCode, nationalCodeHandler] = useState(
    user?.nationalCode?.toString() || ""
  );
  const [email, emailHandler] = useState(user?.email || "");
  const [address, addressHandler] = useState(user?.address || "");
  if (user)
    return (
      <Modal title="تکمیل اطلاعات کاربری" {...props}>
        <div className="h-fit w-full bg-white rounded-xl p-5 space-y-10 flex flex-col items-center">
          <div className="w-full grid grid-cols-2 gap-5">
            <Input value={name} handler={nameHandler} title="نام" />
            <Input
              value={family}
              handler={familyHandler}
              title="نام خانوادگی"
            />
            <Input
              value={nationalCode}
              handler={nationalCodeHandler}
              title="کد پستی"
            />
            <Input value={email} handler={emailHandler} title="ایمیل" />
          </div>
          <div className="flex flex-col space-y-2 mb-5 w-full">
            <label className="text-xl">آدرس</label>
            <textarea
              value={address}
              onChange={(e) => addressHandler(e.target.value)}
              className="bg-gray-100 p-3 rounded-xl outline-none w-full h-40"
              placeholder="آدرس دقیق :‌ استان - شهرستان - خیابان - ... - کوچه - پلاک"
            />
          </div>
          <button
            onClick={() => {
              const tmp_message: notifType = {
                title: "خطای پر کردن داده",
                message: "",
                type: "error",
              };
              if (persianValidator(name)) {
                if (persianValidator(family)) {
                  if (
                    /[0-9]/g.test(nationalCode) &&
                    nationalCode.toString().length === 10
                  ) {
                    if (emailValidator(email)) {
                      if (address.length > 6) {
                        dispatch(
                          changeAccountDataThunk({
                            id: user.id,
                            fName: name,
                            lName: family,
                            nationalCode,
                            email,
                            address,
                          })
                        );
                        props.handler(false);
                        return;
                      } else {
                        tmp_message.message =
                          "آدرس شما به صورت صحیح وارد نشده است";
                      }
                    } else {
                      tmp_message.message =
                        "لطفا ایمیل خود را به صورت صحیح تایپ کنید";
                    }
                  } else {
                    tmp_message.message =
                      "کد پستی شما بایستی ۱۰ رقم از اعداد باشد";
                  }
                } else {
                  tmp_message.message =
                    "لطفا نام خانوادگی خود را به صورت فارسی تایپ کنید";
                }
              } else {
                tmp_message.message = "لطفا نام خود را به صورت فارسی تایپ کنید";
              }
              dispatch(setNotif(tmp_message));
            }}
            className="bg-prime-200 w-44 p-3 rounded-xl"
          >
            <p className="text-white text-lg">ذخیره تنظیمات</p>
          </button>
        </div>
      </Modal>
    );
}
