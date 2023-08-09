import Banner from "@/components/UI/banner";
import Header from "@/components/UI/header";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();
  return (
    <div>
      <Header state={5} />
      <div className="flex items-center justify-center h-screen flex-col space-y-16 bg-caffeePateren">
        <div className="w-2/3 mt-16">
          <Banner
            images={[
              [
                { src: "store/1.jpg", url: "/lists/51" },
                { src: "store/4.jpg", url: "/lists/61" },
                { src: "store/5.png", url: "/lists/11" },
              ],
            ]}
          />
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
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
            onClick={() => router.push("/coffee/")}
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
            <p className="text-xl text-white p-1">تعمیرات لپتاب، کنسول</p>
          </button>
        </div>
        <label className="text-xl text-gray-500">کجا می خوای بری؟</label>
      </div>
    </div>
  );
}
