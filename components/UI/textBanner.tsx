import Banner from "./banner";

export default function TextBanner(props: {
    images: string | string[];
    text: string;
    reverse?: boolean;
}) {
    return (
        <div
            style={{
                flexDirection: props.reverse ? "row-reverse" : "row",
            }}
            className="flex items-center justify-center space-x-5 rtl:space-x-reverse h-fit"
        >
            <div className="w-1/2 bg-amber-300 p-12 h-96 rounded-xl flex">
                <label className="text-2xl text-justify rounded-xl leading-10">
                    {props.text}
                </label>
            </div>
            <div className="w-1/2">
                <Banner images={[props.images]} />
            </div>
        </div>
    );
}
