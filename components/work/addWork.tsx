import Modal from "../UI/modal";
import Input from "../UI/input";
import { jobRequestOrderThunk } from "@/store/core/thunk";
import { useState } from "react";
import { useAppDispatch } from "@/store/HOCs";
import PhoneInput from "../UI/phoneInput";
import { setNotif } from "@/store/core/slice";

export default function RequestWorkModal(props: {
    handler: any;
    open: boolean;
}) {
    const dispatch = useAppDispatch();

    const [name, nameHandler] = useState("");
    const [email, emailHandler] = useState("");
    const [phone, phoneHandler] = useState<number | "">();
    const [landlinePhone, landlinePhoneHandler] = useState<number | "">();
    const [provinceName, provinceNameHandler] = useState("");
    const [cityName, cityNameHandler] = useState("");
    const [edjField, edjFieldHandler] = useState("");
    const [edjLevel, edjLevelHandler] = useState("");
    const [desc, descHandler] = useState("");
    return (
        <Modal {...props} title="درج آگهی استخدام جدید">
            <div className="flex flex-col items-center space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                        value={name}
                        handler={nameHandler}
                        title="نام و نام خانوادگی"
                    />
                    <Input
                        value={email}
                        handler={emailHandler}
                        title="آدرس ایمیل"
                    />
                    <PhoneInput
                        value={phone}
                        handler={phoneHandler}
                        title="شماره موبایل"
                    />
                    <PhoneInput
                        value={landlinePhone}
                        handler={landlinePhoneHandler}
                        title="شماره تلفن ثابت"
                    />
                    <Input
                        value={provinceName}
                        handler={provinceNameHandler}
                        title="استان"
                    />
                    <Input
                        value={cityName}
                        handler={cityNameHandler}
                        title="شهر"
                    />
                    <Input
                        value={edjField}
                        handler={edjFieldHandler}
                        title="آخرین مقطع تحصیلی"
                    />
                    <Input
                        value={edjLevel}
                        handler={edjLevelHandler}
                        title="رشته تحصیلی"
                    />
                </div>
                <textarea
                    value={desc}
                    onChange={(e) => descHandler(e.target.value)}
                    className="bg-gray-100 p-5 rounded-xl w-full h-24"
                    placeholder="توضیحات مربوط به کار خود را وارد کنید"
                />
                <button
                    onClick={() => {
                        if (
                            phone !== undefined &&
                            phone !== "" &&
                            landlinePhone !== undefined &&
                            landlinePhone !== "" &&
                            name !== "" &&
                            cityName !== "" &&
                            provinceName !== "" &&
                            email !== "" &&
                            edjField !== "" &&
                            edjLevel !== "" &&
                            desc !== ""
                        ) {
                            dispatch(
                                jobRequestOrderThunk({
                                    name,
                                    cityName,
                                    provinceName,
                                    phone,
                                    email,
                                    edjField,
                                    edjLevel,
                                    desc,
                                    landlinePhone,
                                })
                            );
                            props.handler(false);
                            nameHandler("");
                            cityNameHandler("");
                            provinceNameHandler("");
                            phoneHandler("");
                            emailHandler("");
                            edjFieldHandler("");
                            edjLevelHandler("");
                            descHandler("");
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
