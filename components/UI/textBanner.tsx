import Banner from "./banner";

export default function TextBanner(props: {
    images: string | string[];
    text: string;
    reverse?: boolean;
}) {
    return (
        <div className="flex md:flex-row flex-col items-center justify-center space-y-5 md:space-y-0 md:space-x-5 rtl:space-x-reverse h-fit">
            <div className="md:w-1/2 w-full bg-amber-300 p-5 md:p-12 md:h-96 rounded-xl flex">
                <label className="md:text-2xl text-justify rounded-xl md:leading-10">
                    {props.text}
                </label>
            </div>
            <div className="w-full md:w-1/2">
                <Banner images={[props.images]} />
            </div>
        </div>
    );
}
