import { Carousel } from "antd";
import Image from "next/image";

function CustomImage(props: { src: string }) {
    return (
        <Image
            alt={props.src}
            src={`https://currencyno.storage.iran.liara.space/Banners/${props.src}`}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
        />
    );
}

export default function Banner(props: { images: (string | string[])[] }) {
    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-${props.images.length} gap-5`}
        >
            {props.images.map((img, index) =>
                !Array.isArray(img) ? (
                    <div
                        key={`banner_${index}`}
                        className={`grow bg-primary-700 rounded-xl overflow-hidden flex items-center justify-center`}
                    >
                        {img === "" ? (
                            <div className="h-96"></div>
                        ) : (
                            <CustomImage src={img} />
                        )}
                    </div>
                ) : (
                    <div
                        key={`banner_${index}`}
                        className="rounded-xl overflow-hidden"
                    >
                        <Carousel autoplay dots={{ className: "p-5" }}>
                            {img.map((image, index) => (
                                <div
                                    className="items-center justify-center flex h-full"
                                    key={index}
                                >
                                    <div
                                        className="bg-primary-500 items-center rounded-xl text-5xl
                                        font-bold justify-center flex text-white overflow-hidden"
                                    >
                                        {image === "" ? (
                                            <div className="h-96 flex items-center justify-center">
                                                <p>{index + 1}</p>
                                            </div>
                                        ) : (
                                            <CustomImage src={image} />
                                        )}
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
