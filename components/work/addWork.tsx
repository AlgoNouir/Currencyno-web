import Modal from "../UI/modal";
import Input from "../UI/input";

export default function RequestWorkModal(props: {
    handler: any;
    open: boolean;
}) {
    return (
        <Modal {...props} title="درج آگهی استخدام جدید">
            <div className="flex flex-col items-center space-y-10">
                <div className="grid grid-cols-2 gap-5">
                    <Input title="نام و نام خانوادگی" />
                    <Input title="جنسیت" />
                    <Input title="آدرس ایمیل" />
                    <Input title="شماره موبایل" />
                    <Input title="استان" />
                    <Input title="شهر" />
                    <Input title="آخرین مقطع تحصیلی" />
                    <Input title="رشته تحصیلی" />
                </div>
                <button className="bg-amber-400 p-5 rounded-xl w-44 text-xl">
                    ارسال درخواست
                </button>
            </div>
        </Modal>
    );
}
