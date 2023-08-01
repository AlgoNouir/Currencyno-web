import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import LoginModal from "@/components/login";
import Product from "@/components/store/product";
import SettingDataModal from "@/components/store/settingData";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { changeAccountDataThunk } from "@/store/account/thunk";
import { OrderStatusEnum } from "@/store/order/slice";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";

const screens = [
  { id: 0, name: "سبد خرید", component: <ProductScreen /> },
  { id: 1, name: "سوابق سفارشات", component: <OrderScreen /> },
  { id: 2, name: "تنظیمات", component: <SettingScreen /> },
];

export default function ProfilePage() {
  const [screen, screenHandler] = useState(screens[0]);
  return (
    <div className="h-screen relative pt-32">
      <div className="absolute top-0">
        <Header state={0} />
      </div>
      <div className="h-full p-5 flex flex-row space-x-5 rtl:space-x-reverse">
        <div className="sm:w-96 h-full bg-bg-200 rounded-xl flex flex-col space-y-2 items-end py-5">
          {screens.map((s, index) => (
            <button
              key={`screen-${index}`}
              onClick={() => screenHandler(s)}
              style={{
                backgroundColor: s.id === screen.id ? "#4771AF" : "",
                color: s.id === screen.id ? "#FFFFFF" : "#000000",
              }}
              className="w-5/6 p-5 rounded-r-full"
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="w-full h">
          <div className="w-full h-16 rounded-xl bg-bg-200 mb-5 flex items-center justify-center">
            <p className="font-bold text-xl">{screen.name}</p>
          </div>
          <div className="h-full w-full">{screen.component}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductScreen() {
  const router = useRouter();
  const userProducts = useAppSelector((store) => store.account.products);
  const user = useAppSelector((store) => store.account.user);
  const products = useAppSelector((store) => store.products);
  const [loginMessage, loginMessageHandler] = useState("");
  const [settingData, settingDataHandler] = useState(false);

  return userProducts.length === 0 ? (
    <div className="flex items-center justify-center h-full flex-col space-y-5 text-gray-600">
      <HiOutlineArchiveBoxXMark className="text-[150px]" />
      <label>در حال حاضر شما محصولی سفارش نداده اید</label>
      <button
        onClick={() => router.push("/lists/all")}
        className="bg-prime-100 p-5 rounded-xl"
      >
        <p className="text-white">مشاهده لیست محصولات</p>
      </button>
    </div>
  ) : (
    <>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
        className="grid w-full gap-5"
      >
        <button
          onClick={
            user === undefined
              ? () =>
                  loginMessageHandler(
                    "شما برای خرید کردن بایستی ابتدا وارد شوید"
                  )
              : user.lName === undefined ||
                user.fName === undefined ||
                user.lName === undefined ||
                user.email === undefined ||
                user.address === undefined ||
                user.lName === null ||
                user.fName === null ||
                user.lName === null ||
                user.email === null ||
                user.address === null
              ? () => {
                  settingDataHandler(true);
                }
              : () => router.push("factor")
          }
          className="absolute bottom-14 text-white z-20
          bg-prime-100 px-16 py-2 rounded-xl left-14"
        >
          سفارش نهایی
        </button>
        {userProducts.map((p, index) => {
          const product = products.find((pp) => pp.id === p.product);
          if (product)
            return (
              <button
                onClick={() => router.push(`product/${product.id}`)}
                className="relative bg-prime-300 rounded-xl"
              >
                <div className="h-96">
                  <Product {...product} />
                </div>
                <div
                  className="bg-prime-300 z-0 rounded-xl flex 
                                    flex-row items-end justify-between p-2"
                >
                  <label>
                    {`${Intl.NumberFormat("fa-IR").format(p.count)} عدد`}
                  </label>
                  <label>
                    {`${Intl.NumberFormat("fa-IR").format(
                      p.count * product.price
                    )} تومان`}
                  </label>
                </div>
              </button>
            );
        })}
      </div>
      <LoginModal message={loginMessage} handler={loginMessageHandler} />
      <SettingDataModal open={settingData} handler={settingDataHandler} />
    </>
  );
}
function Input(props: {
  title: string;
  handler: Dispatch<SetStateAction<string>>;
  value: string;
}) {
  return (
    <div className="flex flex-col space-y-2 mb-5">
      <label>{props.title}</label>
      <input
        value={props.value}
        onChange={(e) => props.handler(e.target.value)}
        type="text"
        className="bg-gray-100 p-3 rounded-xl outline-none w-full"
        placeholder={props.title + " را وارد کنید"}
      />
    </div>
  );
}

export function SettingScreen() {
  // redux
  const user = useAppSelector((store) => store.account.user);
  const dispatch = useAppDispatch();

  // states
  const [name, nameHandler] = useState(user?.fName || "");
  const [family, familyHandler] = useState(user?.lName || "");
  const [nationalCode, nationalCodeHandler] = useState(
    user?.nationalCode?.toString() || ""
  );
  const [email, emailHandler] = useState(user?.email || "");
  const [address, addressHandler] = useState(user?.address || "");

  return (
    <div className="h-fit w-full bg-white rounded-xl p-5 space-y-10 flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2">
        <Input value={name} handler={nameHandler} title="نام شخص" />
        <Input value={family} handler={familyHandler} title="نام خانوادگی" />
        <Input
          value={nationalCode}
          handler={nationalCodeHandler}
          title="کد ملی"
        />
        <Input value={email} handler={emailHandler} title="ایمیل" />
        <div className="flex flex-col space-y-2 mb-5">
          <label>آدرس</label>
          <textarea
            value={address}
            onChange={(e) => addressHandler(e.target.value)}
            className="bg-gray-100 p-3 rounded-xl outline-none w-full h-40"
          />
        </div>
      </div>
      <div className="sm:w-1/2 justify-between flex flex-col items-end">
        <button
          onClick={() =>
            dispatch(
              changeAccountDataThunk({
                fName: name,
                lName: family,
                nationalCode,
                email,
                address,
              })
            )
          }
          className="bg-prime-100 w-44 p-3 rounded-xl"
        >
          <p className="text-white text-lg">ذخیره تنظیمات</p>
        </button>
      </div>
    </div>
  );
}

function OrderScreen() {
  const orders = useAppSelector((store) => store.orders);

  return (
    <div className="relative w-full h-full">
      <div
        className="grid grid-cols-1 xl:grid-cols-2 gap-5 overflow-scroll 
                absolute top-0 left-0 right-0 bottom-0 scrollbar-hide"
      >
        {orders.map((order, index) => (
          <button
            key={index}
            className={`w-full ${
              order.done === 3 ? "bg-zinc-300" : "bg-white"
            } rounded-xl p-5 h-32`}
          >
            <div className="flex flex-col items-center justify-center sm:items-end sm:justify-between sm:flex-row">
              <div className="flex flex-col space-y-5 ">
                <div>{new Date(order.created_at).toLocaleString("fa")}</div>
                <div className="flex flex-row space-x-2 items-center rtl:space-x-reverse">
                  <label>
                    {`${Intl.NumberFormat("fa-IR").format(order.price)} تومان`}
                  </label>
                  <small className="text-gray-600">{`( ${Intl.NumberFormat(
                    "fa-IR"
                  ).format(order.count)} سفارش )`}</small>
                </div>
              </div>
              <div>
                <label>{OrderStatusEnum[order.done]}</label>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
