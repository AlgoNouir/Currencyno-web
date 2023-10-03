import Banner from "@/components/UI/banner";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();
  return (
    <div>
      <div
        className="flex items-center justify-center h-screen flex-col space-y-5
        sm:space-y-5 xl:space-y-16 bg-caffeePateren p-5"
      >
        <button
          onClick={() => router.push("/store")}
          className=" flex flex-row items-center space-x-5 rtl:space-x-reverse"
        >
          <Image
            src={
              "https://currencyno.storage.iran.liara.space/Core/CurrencynoIcon.png"
            }
            width="0"
            height="0"
            sizes="100wv"
            className="w-24 h-24 rounded-full"
            alt="icon"
          />
          <div>
            <p className="font-bold text-4xl ">کارنسینو</p>
            <small className="font-bold">فروشگاه آنلاین و مجموعه خدماتی</small>
          </div>
        </button>
        <div className="xl:w-2/3 mt-16">
          <Banner
            images={[
              [
                { src: "info/1.jpg", url: "/lists/51" },
                { src: "info/2.jpg", url: "/lists/51" },
                { src: "info/3.jpg", url: "/lists/51" },
                { src: "info/4.jpg", url: "/lists/61" },
              ],
            ]}
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          <button
            onClick={() => router.push("/")}
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
        <label className="text-xl text-gray-500 container bg-white p-5 rounded-xl">
          مجموعه کارنسینو با بیش از یک دهه فعالیت و تجربه در ارائه خدمات فروش
          لوازم جانبی کامپیوتر و موبایل ، فروش لپ تاپ استوک و تعمیرات انواع
          کامپیوتر، لپ تاپ،موبایل، و کنسول های بازی می باشد. این فروشگاه با
          پایبندی به اصل های ارائه هر چه سریعتر خدمات ، تضمین اصالت کالا و تست
          هر نوع محصول خریداری شده قبل از ارسال و ارائه فیلم محصول در صورت
          درخواست مشتری راه اندازی شده است . کارشناسان ما آماده پاسخگویی و
          مشاوره خرید قبل از خرید میباشند. تمام روز های هفته به جز روز های تعطیل
          از ساعت 10 صبح الی 20 پاسخگوی شما هستیم .
        </label>
      </div>
    </div>
  );
}
