import Image from "next/image";
import Modal from "../UI/modal";
import Input from "../UI/input";

export default function ReserveModal(props: { handler: any; open: boolean }) {
    return (
        <Modal {...props} title="رزرو کافه کارآفرینی">
            <div className="space-x-5 flex flex-row items-center justify-between w-5/6 rtl:space-x-reverse">
                <div className="flex flex-col space-y-5">
                    <Image
                        src="https://currencyno.storage.iran.liara.space/Banners/caffeh/topBanners/reserveCaffee.jpg"
                        width="0"
                        height="0"
                        sizes="100vw"
                        alt="reserve"
                        className="h-auto w-full opacity-50"
                    />
                    <label className="text-center text-xl font-bold text-gray-600">
                        جهت رزرو کافه کارآفرینی برای مراسمات جلسات کاری و تولد و
                        ایونت های مافیا مشخصات خود را وارد کنید
                    </label>
                </div>
                <div className="flex flex-col space-y-5 items-center">
                    <div className="space-y-5">
                        <Input title="نام و نام خانوادگی" />
                        <Input title="شماره تلفن" />
                    </div>
                    <button className="bg-amber-400 p-5 rounded-xl w-44 text-xl">
                        ارسال درخواست
                    </button>
                </div>
            </div>
        </Modal>
    );
}
