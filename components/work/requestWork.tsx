import Modal from "../UI/modal";
import Input from "../UI/input";
import { useAppDispatch } from "@/store/HOCs";
import { jobOfferOrderThunk, jobRequestOrderThunk } from "@/store/core/thunk";
import { useState } from "react";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";

export default function JobOfferModal(props: { handler: any; open: boolean }) {
    const dispatch = useAppDispatch();

    const [name, nameHandler] = useState("");
    const [email, emailHandler] = useState("");
    const [organName, organNameHandler] = useState("");
    const [organWork, organWorkHandler] = useState("");
    const [phone, phoneHandler] = useState<number | "">();
    const [landlinePhone, landlinePhoneHandler] = useState<number | "">();
    const [cityName, cityNameHandler] = useState("");
    const [provinceName, provinceNameHandler] = useState("");

    return (
        <Modal {...props} title="درج آگهی استخدام جدید">
            <div className="flex flex-col items-center space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                        value={name}
                        handler={nameHandler}
                        title="نام و نام خانوادگی"
                    />
                    <Input value={email} handler={emailHandler} title="ایمیل" />
                    <Input
                        value={organName}
                        handler={organNameHandler}
                        title="نام سازمان (فارسی)"
                    />
                    <Input
                        value={organWork}
                        handler={organWorkHandler}
                        title="سمت سازمانی"
                    />
                    <PhoneInput
                        value={phone}
                        handler={phoneHandler}
                        title="شماره موبایل"
                    />
                    <PhoneInput
                        value={landlinePhone}
                        handler={landlinePhoneHandler}
                        title="تلفن تماس"
                    />
                    <Input
                        value={cityName}
                        handler={cityNameHandler}
                        title="شهر آگهی"
                    />
                    <Input
                        value={provinceName}
                        handler={provinceNameHandler}
                        title="استان آگهی"
                    />
                </div>
                <button
                    onClick={() => {
                        if (
                            phone !== undefined &&
                            phone !== "" &&
                            landlinePhone !== undefined &&
                            landlinePhone !== "" &&
                            name !== "" &&
                            email !== "" &&
                            organName !== "" &&
                            organWork !== "" &&
                            provinceName !== "" &&
                            cityName !== ""
                        ) {
                            dispatch(
                                jobOfferOrderThunk({
                                    name,
                                    email,
                                    organName,
                                    organWork,
                                    provinceName,
                                    cityName,
                                    phone,
                                    landlinePhone,
                                })
                            );
                            props.handler(false);
                            nameHandler("");
                            emailHandler("");
                            organNameHandler("");
                            organWorkHandler("");
                            provinceNameHandler("");
                            cityNameHandler("");
                            phoneHandler("");
                            landlinePhoneHandler("");
                        } else {
                            dispatch(
                                setNotif({
                                    type: "error",
                                    title: "مشکل در ارسال اطلاعات",
                                    message:
                                        "لطفا همه فیلد ها را به درستی پر کنید",
                                })
                            );
                        }
                    }}
                    className="bg-amber-400 p-5 rounded-xl w-44 text-xl"
                >
                    ارسال درخواست
                </button>
            </div>
        </Modal>
    );
}
