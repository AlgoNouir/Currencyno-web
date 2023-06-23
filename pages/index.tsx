import Footer from "@/components/footer";
import Header from "@/components/header";

function Data() {
    return (
        <div className="flex items-center justify-center">
            <div className="bg-white w-64 h-64 rounded-full"></div>
        </div>
    );
}

function Pic() {
    return <div className="bg-white w-1/3 h-96 rounded-xl"></div>;
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
    return (
        <div className="space-y-5 pt-32">
            <div className="fixed w-full top-0">
                <Header />
            </div>
            <div className="p-5 space-y-5">
                <div className="space-x-5 rtl:space-x-reverse flex flex-row items-center">
                    <div className="bg-white w-2/3 rounded-xl h-96"></div>
                    <div className="bg-white w-1/3 rounded-xl h-96"></div>
                </div>
                <div className="grid grid-cols-5 gap-5">
                    <Data />
                    <Data />
                    <Data />
                    <Data />
                    <Data />
                </div>
            </div>
            <div className="p-5 space-y-5">
                <div className="bg-white h-96 rounded-xl"></div>
                <Desc reverse={true} />
                <Desc reverse={false} />
                <Desc reverse={true} />
                <Desc reverse={false} />
            </div>
            <Footer />
        </div>
    );
}
