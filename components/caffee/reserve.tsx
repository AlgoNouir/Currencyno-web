import { axiosNoUser } from "@/core/axios";
import { useAppDispatch } from "@/store/HOCs";
import { loginThunk } from "@/store/account/thunk";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import Modal from "../UI/modal";

function Input(props: { title: string }) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-xl">{props.title}</label>
            <input
                type="text"
                className="bg-gray-100 p-5 rounded-xl w-96"
                placeholder={props.title + " را وارد کنید"}
            />
        </div>
    );
}

export default function ReserveModal(props: { handler: any; open: boolean }) {
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
                        آکادمی اقتصادی کارنسینو (خانه اقتصاد) دارای فضای اشتراکی
                        کاری و کتابخانه اقتصادی توسعه دهندگان، علاقه مندان بازار
                        های مالی و دیگر اشخاص کارآفرین می باشد
                    </label>
                </div>
                <div className="flex flex-col space-y-5 items-center">
                    <div className="space-y-5">
                        <Input title="نام و نام خانوادگی" />
                        <Input title="شماره تلفن" />
                        <Input title="کد ملی" />
                        <Input title="تاریخ تولد" />
                    </div>
                    <button className="bg-amber-400 p-5 rounded-xl w-44 text-xl">
                        ارسال درخواست
                    </button>
                </div>
            </div>
        </Modal>
    );
}
