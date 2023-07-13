import { Carousel } from "antd";

export default function Banner2(props: {
    images: [string, string | string[]][];
}) {
    return (
        <div className="w-full flex flex-row space-x-5 rtl:space-x-reverse">
            {props.images.map(([size, img], index) =>
                !Array.isArray(img) ? (
                    <div
                        key={`banner_${index}`}
                        className={`w-${size} grow h-96 bg-primary-700 rounded-xl`}
                    ></div>
                ) : (
                    <div
                        key={`banner_${index}`}
                        className={`w-${size} h-96 rounded-xl`}
                    >
                        <Carousel
                            autoplay
                            dots={{ className: "bg-prime-300/30 p-5" }}
                        >
                            {img.map((image, index) => (
                                <div
                                    className="items-center justify-center flex h-full"
                                    key={index}
                                >
                                    <div
                                        className="bg-primary-500 items-center h-96 rounded-xl text-5xl 
                                        font-bold justify-center flex text-white"
                                    >
                                        {index}
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )
            )}
        </div>
    );
}
