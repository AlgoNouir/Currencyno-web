import Footer from "@/components/footer";
import Header from "@/components/header";
import Product from "@/components/product";
import { useAppSelector } from "@/store/HOCs";
import Image from "next/image";
import { AiOutlineFieldTime } from "react-icons/ai";

function Data(props: { icon: any; text: string }) {
    return (
        <div className="flex items-center justify-center flex-col space-y-3">
            <div
                className="bg-bg-200 w-48 h-48 rounded-full text-8xl
                items-center justify-center flex text-prime-100"
            >
                {props.icon}
            </div>
            <p className="text-2xl text-black/50">{props.text}</p>
        </div>
    );
}

function Pic() {
    return <div className="bg-bg-200 w-1/3 h-96 rounded-xl"></div>;
}

function Desc(props: { reverse: boolean }) {
    return (
        <div className="flex flex-row space-x-5 rtl:space-x-reverse p-5">
            {props.reverse && <Pic />}
            <div className="w-2/3 p-5">
                <h1 className="font-bold text-2xl mb-5">hello test</h1>
                <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                    با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                    آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                    طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                    صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                    راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل
                    حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای
                    موجود طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن
                    ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                    طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
                    ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                    نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                    باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده
                    شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                    خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می
                    توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
                    شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی
                    دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود
                    طراحی اساسا مورد استفاده قرار گیرد.
                </p>
            </div>
            {!props.reverse && <Pic />}
        </div>
    );
}

export default function Home() {
    const products = useAppSelector((store) => store.products)[0];
    return (
        <div className="space-y-5 pt-32">
            <div className="fixed w-full top-0 z-20">
                <Header />
            </div>
            <div className="p-5 space-y-5 items-center flex flex-col">
                <div className="space-x-5 rtl:space-x-reverse flex flex-row items-center w-full">
                    <div className="bg-bg-200 w-2/3 rounded-xl h-96 overflow-hidden relative">
                        <Image
                            src={require("@/public/3.png")}
                            alt="test"
                            width={1100}
                            className="absolute"
                        />
                        <div className="bg-yellow-500/50 animate-pulse grow absolute z-10 w-full h-full"></div>
                        <div className="absolute z-10 w-64  top-7 right-7">
                            <Product {...products} />
                        </div>
                    </div>
                    <button
                        className="bg-[#ef3f3e]  w-1/3 rounded-xl h-96 flex flex-col
                        items-center justify-center relative"
                    >
                        <Image
                            src={require("@/public/watch_prev_ui.png")}
                            alt="besrt"
                            height={350}
                            className="-mt-14 "
                        />
                        <p className="font-bold text-3xl mt-5 text-white">
                            G-tab GT3 pro
                        </p>
                        <div
                            className="bg-prime-100 border-4 border-prime-200 w-20 h-20 items-center top-5 right-5
                            justify-center flex rounded-full text-white absolute rotate-12"
                        >
                            <div
                                className="bg-prime-200/50 rounded-full  animate-ping
                                h-16 w-16 absolute"
                            ></div>
                            <label>پر فروش</label>
                        </div>
                    </button>
                </div>
                <div className="bg-prime-100 h-96 rounded-xl w-full"></div>
                <div className="grid grid-cols-5 w-fit gap-10">
                    <Data icon={<AiOutlineFieldTime />} text="متن تست" />
                    <Data icon={<AiOutlineFieldTime />} text="متن تست" />
                    <Data icon={<AiOutlineFieldTime />} text="متن تست" />
                    <Data icon={<AiOutlineFieldTime />} text="متن تست" />
                    <Data icon={<AiOutlineFieldTime />} text="متن تست" />
                </div>
            </div>
            <div className="p-5 space-y-5">
                <Desc reverse={true} />
                <Desc reverse={false} />
                <Desc reverse={true} />
                <Desc reverse={false} />
            </div>
            <Footer />
        </div>
    );
}
