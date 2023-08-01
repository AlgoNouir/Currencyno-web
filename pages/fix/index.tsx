import Banner from "@/components/UI/banner";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import TextBanner from "@/components/UI/textBanner";
import FixRequestModal from "@/components/fix/reserve";
import { Collapse } from "antd";
import { useState } from "react";

export default function MainPage() {
  const [modal, modalHandler] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center pt-36 bg-fixPattern">
        <Header state={4} />
        <div className="p-5 space-y-5 sm:container">
          <button
            onClick={() => modalHandler(true)}
            className="bg-rose-400 w-full p-5 space-x-5 rtl:space-x-reverse rounded-xl flex items-center justify-center relative"
          >
            <div className="absolute animate-ping bg-rose-500/30 rounded-full w-1/2 h-full"></div>
            <label className="text-sm sm:text-3xl font-bold">
              جهت مشاوره رایگان و درخواست تعمیرات از اینجا اقدام کنید
            </label>
          </button>
          <Banner images={[{ src: "fix/1.jpg" }]} />
          <TextBanner
            images={"fix/4.jpg"}
            text="
                    تعمیرات لپ تاپ ، کامپیوتر ، موبایل و کنسول بازی دغدغه ی
                    بسیاری از کاربرانی است که از این دستگاه استفاده می کنند.
                    تعمیرات نرم افزاری لپ تاپ و تعمیر سخت افزاری لپ تاپ نیاز
                    به دانش تخصصی دارد. لذا برای تعمیر لپ تاپ بهترین گزینه
                    مراجعه به نمایندگی تعمیر لپ تاپ است. مرکز تعمیرات سخت
                    افزار کارنسینو با کارشناسی مجرب در خدمت شماست جهت دریافت
                    مشاوره تعمیرات شخت افزار و نرم افزار با شماره زیر تماس
                    حاصل فرمایید."
          />

          <Banner images={[{ src: "fix/2.jpg" }]} />
          <div className="bg-amber-300 rounded-xl p-5">
            <label className="md:text-2xl text-sm md:leading-loose text-justify">
              از آن‌جایی که عیب‌یابی اصولی مهم‌ترین مرحله از پروسه تعمیرات هر
              دستگاهی به حساب می‌آید، تکنسین‌های نمایندگی تعمیرات لپ تاپ، دقت
              بالایی را صرف عیب‌یابی لپ تاپ می‌کنند؛ تا مشکل اصلی آن را پیدا
              کرده و تشخیص دهند که قطعه معیوب شده قابل تعمیر است یا باید تعویض
              شود. سپس براساس همین اطلاعات هزینه تعمیر لپ تاپ را برآورد کرده و
              به کاربر اطلاع می‌دهد. پس از آن اگر کاربر تمایل داشت، پروسه
              تعمیرات تخصصی لپ تاپ را آغاز می‌کنند؛ درنهایت نیز با تست و بررسی
              نهایی سیستم، از رفع مشکل آن اطمینان حاصل می‌کنند و لپ تاپ کاربر را
              مانند روز اول در اختیارش قرار می‌دهند. اگر شما هم با مشکلی در لپ
              تاپتان مواجه شده‌اید و به دنبال مرکزی هستید تا لپ تاپ شما را به
              صورت تخصصی تعمیر کند، می‌توانید با نمایندگی تعمیر لپ تاپ تماس
              بگیرید.
            </label>
          </div>
          <Banner images={[{ src: "fix/3.jpg" }]} />
          <div className="bg-amber-300 rounded-xl p-5">
            <Collapse
              ghost
              items={[
                {
                  key: 1,
                  label: <p className="text-2xl font-bold">درباره ما</p>,
                  children: (
                    <label className="md:text-2xl md:leading-loose text-justify">
                      بررسی کامل سخت افزار سیستم و تمام مشکلات احتمالی به وجود
                      آمده در رابطه با سخت افزار کامپیوتر و لپتاپ ها در برند های
                      مختلف اعم از ، تعمیر لپ تاپ های ایسوس (Asus)، دل(Dell) ،
                      اچ پی(hp) و غیره خدمات تعمیرات کامپیوتر، لپ تاپ موبایل و
                      کنسول های بازی (ps-xbox) تعمیرات تخصصی لپ تاپ با گارانتی
                      ویژه یکی از سرویس های مرکز سخت افزار این مجموعه است. این
                      مجموعه ضمن برخورداری از تجهیزات پیشرفته جهت تعمیر انواع لپ
                      تاپ و استفاده از نوین ترین متدهای روز دنیا، شرایط را
                      برای تعمیر لپ تاپ   در برندهای مختلف مهیا نموده است. این
                      مجموعه با تجهیز فضای خویش به پیشرفته‌ترین ابزارآلات
                      عیب‌یابی و تعمیر لپ تاپ در تلاش است تا بالاترین سطح کیفی
                      خدمات را به مشتریان و مراجعان ارائه نماید. کارشناسان حاضر
                      در مجموعه کارنسینو با بهره گیری از سال ها تجربه در امر
                      تعمیرات سخت افزار و استفاده از بروزترین تجهیزات
                      الکترونیکی، کلیه تعمیرات سخت افزاری و نرم افزاری انواع لپ
                      تاپ ، کامپیوتر ، موبایل و کنسول بازی را با قطعات اورجینال
                      و مناسب ترین هزینه به مشتریان عزیز ارائه می نماید.
                    </label>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <Footer />
      </div>
      <FixRequestModal open={modal} handler={modalHandler} />
    </>
  );
}
