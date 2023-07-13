import React from "react";
import { Carousel } from "antd";
import Image from "./image";

function ImageCarousel(props: { images: string[] }) {
    return (
        <Carousel
            autoplay
            dots={{ className: "bg-prime-300/30 p-5" }}
            className="h-96"
        >
            {props.images.map((image, index) => (
                <div
                    className="items-center justify-center flex w-full h-full"
                    key={index}
                >
                    <div>
                        <Image name={image} />
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

export default ImageCarousel;
