import { useRouter } from "next/router";

export default function Page404() {
    const router = useRouter();
    return (
        <div className="flex items-center justify-center h-screen flex-col space-y-16">
            <label className="text-4xl text-gray-500">
                نتونستیم صفحه مورد نظر شما رو پیدا کنیم :(
            </label>
            <div className="grid grid-cols-5 gap-5">
                <button
                    onClick={() => router.push("/store/")}
                    className="flex flex-row items-end justify-center hover:bg-primary-500
                           bg-primary-600 p-5 rounded-xl transition-all"
                >
                    <p className="text-xl text-white p-1">محصولات دیجیتال</p>
                </button>
                <button
                    onClick={() => router.push("/academy/")}
                    className="flex flex-row items-end justify-center hover:bg-primary-500
                           bg-primary-600 p-5 rounded-xl transition-all"
                >
                    <p className="text-xl text-white p-1">کتابخانه اقتصادی</p>
                </button>
                <button
                    onClick={() => router.push("/caffeh/")}
                    className="flex flex-row items-end justify-center hover:bg-primary-500
                           bg-primary-600 p-5 rounded-xl transition-all"
                >
                    <p className="text-xl text-white p-1">کافه کارآفرینی</p>
                </button>
                <button
                    onClick={() => router.push("/work/")}
                    className="flex flex-row items-end justify-center hover:bg-primary-500
                           bg-primary-600 p-5 rounded-xl transition-all"
                >
                    <p className="text-xl text-white p-1">کاریابی و استخدام</p>
                </button>
                <button
                    onClick={() => router.push("/fix/")}
                    className="flex flex-row items-end justify-center hover:bg-primary-500
                           bg-primary-600 p-5 rounded-xl transition-all"
                >
                    <p className="text-xl text-white p-1">
                        تعمیرات لپتاب، کنسول
                    </p>
                </button>
            </div>
            <label className="text-xl text-gray-500">کجا می خوای بری؟</label>
        </div>
    );
}