import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import Banner from "@/components/UI/banner";
import ProductLists from "@/components/store/productsList";
import { useAppSelector } from "@/store/HOCs";
import ReserveModal from "@/components/academy/reserve";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiFillCheckCircle } from "react-icons/ai";

export default function MainPage() {
  const products = useAppSelector((store) => store.products);
  const router = useRouter();
  const [reserveModal, reserveModalHandler] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center pt-36 space-y-5 bg-academyPattern">
        <Header state={1} />
        <div className="sm:container p-5 w-full space-y-5">
          <div className="grid sm:grid-cols-3 gap-5">
            <button
              onClick={() => router.push("/lists/59")}
              className="bg-amber-400 h-24 rounded-xl border-4 border-indigo-900"
            >
              <label className="text-lg sm:text-2xl font-bold">
                خرید کتاب های اقتصادی و بازار های مالی
              </label>
            </button>
            <button
              onClick={() => router.push("https://aparat.com")}
              className="bg-amber-400 h-24 rounded-xl border-4 border-indigo-900"
            >
              <label className="text-lg sm:text-2xl font-bold">
                ویدیو های آموزشی بازار های مالی
              </label>
            </button>
            <button
              onClick={() => reserveModalHandler(true)}
              className="bg-amber-400 h-24 rounded-xl border-4 border-indigo-900"
            >
              <label className="text-lg sm:text-2xl font-bold">
                رزرو خدمات فضای اشتراکی
              </label>
            </button>
          </div>
          <Banner
            images={[
              [
                { src: "academy/8.jpg" },
                { src: "academy/9.jpg" },
                { src: "academy/10.jpg" },
              ],
            ]}
          />
          <ProductLists
            products={products.filter((product) => product.category === 59)}
            title={{
              name: "کتاب های بازار های مالی و اقتصادی",
              moreDir: "/lists/59",
            }}
          />
          <div className="bg-amber-300 rounded-xl p-5">
            <p className="sm:text-2xl text-lg leading-loose text-justify">
              قطعا به دنبال افزایش دانش و مهارت های خود در زمینه اقتصادی و مالی
              برای بهبودی و یا تقویت عملکرد و افزایش راندمان شخص و خانواده یا
              مجموعه خودتان هستید. پس به همین منظور آکادمی اقتصادی و مالی
              تحلیلگران نگرش نو تجارت به شما در زمینه های بازار های مالی ،
              کارآفرینی و ایجاد اشتغال ، طرح نویسی برای بنگاه های اقتصادی مانند
              بانک و ادارات ، سرمایه گذاری ، تولیدی و هر سه با هدف افزایش دانش و
              مهارت و تسریع در روند در درامدزایی و مدیریت سرمایه کمک می کند.
              برای اقدام کافیست فرم را تکمیل کنید تا با شما تماس گرفته شود.
            </p>
          </div>
          <Banner
            images={[
              [
                { src: "academy/3.jpg" },
                { src: "academy/4.jpg" },
                { src: "academy/5.jpg" },
              ],
            ]}
          />
          <div className="bg-white p-10 space-y-5 rounded-xl text-3xl">
            <p>
              فضای اشتراکی ، فضایی که در اختیار شما قرار می گیرد که در کنار
              یکدیگر به انجام فعالیت های کاری و استارت آپ یا مطالعه بپردازیم.
            </p>
            {[
              "وجود فضای منعطف دوستانه",
              "صاحبان شغل انلاین",
              "دانشجویان ",
              "امنیت",
              "فضای باز ",
              "مقرون بصرفه",
              "مبلمان اداری",
              "انعطاف پذیری فضا",
              "کافه رستوران",
            ].map((d, index) => (
              <div
                className="flex flex-row items-center space-x-5 rtl:space-x-reverse text-sm sm:text-xl"
                key={`data_${index}`}
              >
                <AiFillCheckCircle className="sm:text-5xl text-green-400" />
                <label>{d}</label>
              </div>
            ))}
          </div>
          <div className="bg-amber-300 rounded-xl p-5">
            <p className="sm:text-2xl text-lg leading-loose text-justify">
              مجموعه خانه اقتضاد با برند کارنسینو با بیش از 10سال سابقه فعالیت و
              تجربه در ارائه خدمات فروشگاهی و خدمات اقتصادی اعم از فروش انواع
              موبایل و لپتاب و کامپیوتر و لوازم جانبی صفر و استوک و تعمیرات
              انواع کامپیوتر و لپتاب و موبایل و کنسول های بازی و خدمات مشاوره
              کارآفرینی و فضای اشتراکی و فعال در حوزه اشتغال زایی و تولیدی و
              کوچینگ کسب و کار ها می باشد. این مجموعه با پایبندی به اصل های
              ارائه خدمات سریع و با کیفیت و تضمینی اصالت کالا و تست هر نوع محصول
              خریداری شده ، قبل از ارسال و ارائه فیلم محصول در صورت درخواست
              مشتری از فرایند راه اندازی و نحوه ارسال را انجام می دهد و برای
              سایر خدمات نیز از مجربترین اساتید و همکاران بهرمند می باشد.
            </p>
          </div>
          <div className="bg-amber-300 rounded-xl p-5">
            <p className="text-2xl text-center leading-loose">
              کارشناسان ما آماده پاسخگویی و مشاوره خرید یا استفاده از خدمات تمام
              روز های هفته به جز روز های تعطیل از ساعت 10 صبح الی 20 پاسخگوی شما
              می باشند. لطفا پیشنهاد های خودتان را با شماره های فوق در میان
              بزارید . سپاسگزاریم.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      <ReserveModal open={reserveModal} handler={reserveModalHandler} />
    </>
  );
}
