import { productType } from "@/store/product/slice";
import { useRouter } from "next/router";
import { BiSolidOffer } from "react-icons/bi";
import CustomImage from "../UI/image";

export default function Product(props: productType) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/product/${props.id}`)}
      className="bg-bg-200 rounded-xl p-5 flex flex-col justify-between h-full border-4 border-primary-500 w-full"
      dir="rtl"
    >
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-center">
          <CustomImage name={props.image[0]} />
        </div>
        <p className="text-center text-gray-600">{props.persianName}</p>
      </div>
      <div className="flex flex-col justify-end">
        {props.offerPrice > 0 && (
          <del className="flex text-red-600 flex-row items-center space-x-2 rtl:space-x-reverse justify-end">
            {Intl.NumberFormat("fa-IR").format(props.price)}
          </del>
        )}
        <div className="flex flex-row items-center justify-between">
          {props.offerPrice > 0 && (
            <div className="flex flex-row items-center justify-between">
              <div className="text-green-700 flex flex-row items-center space-x-1 rtl:space-x-reverse">
                <BiSolidOffer className="text-2xl" />
                <p className="text-lg">
                  {Intl.NumberFormat("fa-IR").format(
                    Math.round(
                      (-1000 * (props.offerPrice - props.price)) / props.price
                    ) / 10
                  )}
                </p>
              </div>
              {/* <small>تخفیف</small> */}
            </div>
          )}
          <div className="flex flex-row grow items-center space-x-2 rtl:space-x-reverse justify-end">
            <p
              className={`text-xl font-bold ${
                props.offerPrice > 0 ? "text-green-700" : "text-text"
              }`}
            >
              {Intl.NumberFormat("fa-IR").format(
                props.offerPrice > 0 ? props.offerPrice : props.price
              )}
            </p>
            <small className="text-gray-500">تومان</small>
          </div>
        </div>
      </div>
    </button>
  );
}
