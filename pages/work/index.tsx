// main
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

// components & icons
import { MdOutlineTask, MdOutlineWorkOutline } from "react-icons/md";
import Banner from "@/components/UI/banner";
import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import AddWorkModal from "@/components/work/addWork";
import RequestWorkModal from "@/components/work/requestWork";

function ActionButton(props: {
  handler: Dispatch<SetStateAction<boolean>>;
  title: string;
  icon: ReactNode;
}) {
  return (
    <button
      className="bg-amber-400 grow text-xl font-bold md:text-3xl p-5 rounded-xl flex items-center 
            justify-center space-x-5 rtl:space-x-reverse"
      onClick={() => props.handler(true)}
    >
      <label>{props.title}</label>
      {props.icon}
    </button>
  );
}

export default function MainPage() {
  const [addWork, addWorkHandler] = useState(false);
  const [requestWork, requestWorkHandler] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center pt-36 bg-workPattern">
        <Header state={3} />
        <div className="p-5 space-y-5 sm:container">
          <Banner images={[{ src: "work/1.jpg" }]} />
          <div className="flex flex-col max-md:space-y-5 md:flex-row md:space-x-5 rtl:space-x-reverse">
            <ActionButton
              icon={<MdOutlineWorkOutline />}
              title="درج آگهی استخدام"
              handler={addWorkHandler}
            />
            <ActionButton
              icon={<MdOutlineTask />}
              title="ثبت نام کارجو"
              handler={requestWorkHandler}
            />
          </div>
          <Banner images={[{ src: "work/2.jpg" }]} />
          <div className="bg-amber-300 rounded-xl p-5">
            <label className="text-sm sm:text-xl lg:text-2xl leading-loose text-justify">
              علی‌رغم وجود معضل بیکاری در کشور و سیل عظیم افراد تحصیل‌کرده جویای
              کار، یافتن نیروی متخصص و کارآمد برای کارفرمایان چندان آسان
              نیست.بنابراین اگر شما به‌عنوان یک کارفرما به دنبال نیروی ماهر و
              توانمند هستید میتوانید بر روی ما حساب کنید. کارنسینو می‌کوشد با
              انتشار آگهی‌های شغلی، فراخوان‌ها و اخبار استخدام سراسر کشور در
              کنار ارائه بروزترین امکانات، متدها و ابزارهای جذب و استخدام، محیطی
              حرفه‌ای و کارآمد برای ارتباط کارجو و کارفرما برقرار کرده است. شما
              میتوانید به عنوان کارفرما یا کارجو در قسمت مشخص شده در سایت فرم
              ثبتنام خود را پر کنید. اگر کارجو هستید پس از ثبتنام ما با شما تماس
              گرفته و در مورد شغل انتخابی صحبت خواهیم کرد و اگر مورد تایید شما
              بود ، جلسه ای را برای ارتباط شما با کارفرما مشخص خواهیم کرد. اگر
              کارفرما هستید اگهی مربوط به شغل خود را ثبت کرده و اطلاعات خود را
              بصوت کامل وارد نمایید سپس بقیه کار را به ما بسپارید ما نیروی متخصص
              با شغل شمارا برای شما پیدا میکنیم.
            </label>
          </div>
          <Banner images={[{ src: "work/3.jpg" }]} />
        </div>
        <Footer />
      </div>
      <RequestWorkModal open={addWork} handler={addWorkHandler} />
      <AddWorkModal open={requestWork} handler={requestWorkHandler} />
    </>
  );
}
