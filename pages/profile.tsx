import Footer from "@/components/UI/footer";
import Header from "@/components/UI/header";
import LoginModal, { LoginComponent } from "@/components/login";
import HistoryModal from "@/components/store/historyProduct";
import Product from "@/components/store/product";
import SettingDataModal from "@/components/store/settingData";
import { postPrice } from "@/core";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { OrderProduct, addOfflineProduct } from "@/store/account/slice";
import {
  addToCartThunk,
  changeAccountDataThunk,
  logoutThunk,
} from "@/store/account/thunk";
import { OrderStatusEnum } from "@/store/order/slice";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiCheckShield, BiSolidUser, BiUser } from "react-icons/bi";
import { BsCardChecklist, BsCart, BsCartFill, BsCartX } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { RiSettings5Line, RiSettings5Fill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import {
  HiBuildingStorefront,
  HiOutlineArchiveBoxXMark,
} from "react-icons/hi2";
import { MdDelete, MdSupportAgent } from "react-icons/md";

export default function ProfilePage() {
  const user = useAppSelector((store) => store.account.user);
  const screens = [
    {
      id: 0,
      name: "سبد خرید",
      component: <ProductScreen />,
      icon: <BsCart />,
      iconSelected: <BsCartFill />,
    },
    ...(user === undefined
      ? [
          {
            id: 1,
            name: "ورود به حساب کاربری",
            component: <LoginScreen />,
            icon: <BiUser />,
            iconSelected: <BiSolidUser />,
          },
        ]
      : [
          {
            id: 2,
            name: "سوابق سفارشات",
            component: <OrderScreen />,
            iconSelected: <BsCardChecklist />,
            icon: <BsCardChecklist />,
          },
          {
            id: 3,
            name: "تنظیمات",
            component: <SettingScreen />,
            icon: <RiSettings5Line />,
            iconSelected: <RiSettings5Fill />,
          },
        ]),
  ];
  const [screen, screenHandler] = useState(screens[0]);

  useEffect(() => {
    if (screen.id === 1 && user !== undefined) screenHandler(screens[0]);
  }, [screen, screenHandler, user]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="relative pt-32 flex flex-col space-y-10">
      <div className="absolute top-0">
        <Header state={0} />
      </div>
      <div
        className="md:h-full h-fit p-5 flex flex-col space-y-6 lg:space-y-0 lg:flex-row md:space-x-5 
        rtl:space-x-reverse mb-10 min-h-screen"
      >
        <div className="sm:w-96 h-full bg-bg-200 rounded-xl flex flex-col space-y-2 items-center lg:items-end py-5">
          {screens.map((s, index) => (
            <button
              key={`screen-${index}`}
              disabled={s.id === screen.id}
              onClick={() => screenHandler(s)}
              style={{
                backgroundColor: s.id === screen.id ? "#4771AF" : "",
                color: s.id === screen.id ? "#FFFFFF" : "#000000",
              }}
              className="w-5/6 p-5 rounded-r-full font-bold flex flex-row 
              items-center justify-center space-x-3 rtl:space-x-reverse max-lg:rounded-l-full"
            >
              <p className="text-2xl">
                {s.id === screen.id ? s.iconSelected : s.icon}
              </p>
              <p>{s.name}</p>
            </button>
          ))}
          {user === undefined ? (
            <></>
          ) : (
            <button
              key={`screen-exit`}
              onClick={() => {
                dispatch(logoutThunk());
                router.push("/");
              }}
              className="w-5/6 p-5 rounded-r-full text-red-700"
            >
              خروج از حساب کاربری
            </button>
          )}
        </div>
        <div className="w-full flex flex-col">
          <div className="md:h-full h-fit w-full">{screen.component}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function LoginScreen() {
  return (
    <div className="bg-white h-2/3 items-center justify-center w-full relative rounded-xl flex">
      <LoginComponent message="" />
    </div>
  );
}

export function ProductScreen() {
  const router = useRouter();
  const userProducts = useAppSelector((store) => store.account.cartProduct);
  const user = useAppSelector((store) => store.account.user);
  const products = useAppSelector((store) => store.products);
  const [loginMessage, loginMessageHandler] = useState("");
  const [settingData, settingDataHandler] = useState(false);

  const dispatch = useAppDispatch();

  return userProducts.length === 0 ? (
    <div className="flex items-center justify-center h-2/3 flex-col space-y-5 text-gray-600">
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
    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 rtl:space-x-reverse h-full">
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
        className="grid w-full gap-5"
      >
        {userProducts.map((p, index) => {
          const product = products.find((pp) => pp.id === p.product);
          const select = product?.counts.find((s) => s.id === p.select);
          if (product)
            return (
              <div className="relative">
                <button
                  onClick={() => {
                    if (user !== undefined) {
                      dispatch(
                        addToCartThunk({
                          product: product.id,
                          select: p.select || -1,
                          count: 0,
                        })
                      );
                    } else {
                      dispatch(
                        addOfflineProduct({
                          id: -1,
                          product: product.id,
                          select: p.select,
                          count: 0,
                        })
                      );
                    }
                  }}
                  className="absolute text-red-700 bg-red-500/50 text-2xl p-2 rounded-full z-10 left-3 top-3"
                >
                  <MdDelete />
                </button>
                <button
                  onClick={() => router.push(`product/${product.id}`)}
                  className="relative bg-prime-300 rounded-xl h-fit"
                >
                  <div className="absolute top-3 right-3">
                    {select !== undefined ? (
                      <div className="bg-gray-200 p-2 rounded-xl">
                        {select.name}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="h-96">
                    <Product {...product} />
                  </div>
                  <div className="bg-white z-0 rounded-xl p-2 border-4 border-primary-500 space-y-2">
                    <div className="flex flex-row items-center justify-start font-bold space-x-2 rtl:space-x-reverse text-primary-700">
                      <BiCheckShield className="text-xl" />
                      <label className="text-sm">{product.garanty}</label>
                    </div>
                    <div className="flex flex-row text-primary-700 font-bold space-x-2 rtl:space-x-reverse items-center">
                      <HiBuildingStorefront className="text-xl" />
                      <label className="text-sm">ارسال از انبار کارنسینو</label>
                    </div>
                    <div className="flex flex-row items-end justify-between ">
                      <label>
                        {`${Intl.NumberFormat("fa-IR").format(p.count)} عدد`}
                      </label>
                      <label>
                        {`${Intl.NumberFormat("fa-IR").format(
                          p.count * product.price
                        )} تومان`}
                      </label>
                    </div>
                  </div>
                </button>
              </div>
            );
        })}
      </div>
      <div className="bg-white w-full md:w-96 h-fit space-y-14 rounded-xl p-5 justify-items-center">
        <div className="grid grid-cols-3 gap-y-5 font-bold text-xl">
          <label className="text-gray-500">قیمت کل</label>
          <label className="text-gray-500">
            {Intl.NumberFormat("fa-IR").format(
              userProducts.reduce((obj, product) => {
                const tmp = products?.find((p) => p.id === product.product);
                if (tmp) return obj + tmp.price * product.count;
                return 0;
              }, 0)
            )}
          </label>
          <small className="text-gray-500">تومان</small>
          <label className="text-gray-500">پست</label>
          <label className="text-gray-500">
            {userProducts.find((p) => {
              if (
                [61, 56].includes(
                  products.find((pp) => pp.id === p.product)?.category || -1
                )
              )
                return true;
              return false;
            }) === undefined
              ? Intl.NumberFormat("fa-IR").format(postPrice)
              : "رایگان!"}
          </label>
          <small className="text-gray-500">
            {userProducts.find((p) => {
              if (
                [61, 56].includes(
                  products.find((pp) => pp.id === p.product)?.category || -1
                )
              )
                return true;
              return false;
            }) === undefined
              ? "تومان"
              : ""}
          </small>
          <label className="text-red-500">تخفیف</label>
          <label className="text-red-500">
            {Intl.NumberFormat("fa-IR").format(
              userProducts.reduce((obj, product) => {
                const tmp = products?.find((p) => p.id === product.product);
                if (tmp)
                  return (
                    obj +
                    (tmp.offerPrice === 0 ? 0 : tmp.price - tmp.offerPrice) *
                      product.count
                  );
                return 0;
              }, 0)
            )}
          </label>
          <small className="text-red-500">تومان</small>
          <label className="border-t border-red-700 pt-4">جمع</label>
          <label className="border-t border-red-700 pt-4">
            {Intl.NumberFormat("fa-IR").format(
              userProducts.reduce((obj, product) => {
                const tmp = products?.find((p) => p.id === product.product);
                if (tmp)
                  return (
                    obj +
                    (tmp.offerPrice === 0 ? tmp.price : tmp.offerPrice) *
                      product.count
                  );
                return 0;
              }, 0) +
                (userProducts.find((p) => {
                  if (
                    [61, 56].includes(
                      products.find((pp) => pp.id === p.product)?.category || -1
                    )
                  )
                    return true;
                  return false;
                }) === undefined
                  ? postPrice
                  : 0)
            )}
          </label>
          <small className="border-t border-red-700 pt-4">تومان</small>
        </div>
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
          className="bottom-14 text-white z-20 w-full hidden md:flex
          bg-prime-200 px-16 py-3 rounded-xl left-14 items-center justify-center"
        >
          <p className="text-xl font-bold">سفارش نهایی</p>
        </button>
        <div
          style={{
            gridTemplateColumns: "40px 1fr",
          }}
          className="grid gap-y-5 text-gray-500"
        >
          <MdSupportAgent className="text-2xl" />
          <p>مشاوره و پشتیبانی هفت روز هفته بجز ایام تعطیل ۱۰ صبح تا ۷ شب</p>
          <FaBuilding className="text-2xl" />
          <p>مجموعه فروشگاهی خدماتی کارنسینو </p>
          <FaTruckFast className="text-2xl" />
          <p>ارسال سریع در کمترین زمان</p>
        </div>
      </div>
      <LoginModal message={loginMessage} handler={loginMessageHandler} />
      <SettingDataModal open={settingData} handler={settingDataHandler} />
      <div className="md:hidden flex fixed bg-white w-full bottom-0 right-0 left-0 p-5">
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
          className="bottom-14 text-white z-20 w-full
          bg-prime-200 px-16 py-3 rounded-xl left-14"
        >
          <p className="text-xl font-bold">ادامه خرید</p>
        </button>
      </div>
    </div>
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
          title="کد پستی"
        />
        <Input value={email} handler={emailHandler} title="ایمیل" />
        <div className="flex flex-col space-y-2 mb-5">
          <label>آدرس</label>
          <textarea
            value={address}
            onChange={(e) => addressHandler(e.target.value)}
            className="bg-gray-100 p-3 rounded-xl outline-none w-full h-40"
            placeholder="آدرس دقیق :‌ استان - شهرستان - خیابان - ... - کوچه - پلاک"
          />
        </div>
      </div>
      <div className="sm:w-1/2 justify-between flex flex-col items-end">
        <button
          onClick={() =>
            dispatch(
              changeAccountDataThunk({
                id: user?.id || -1,
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
  const [pass, passHandler] = useState(false);
  const [products, productsHandler] = useState<OrderProduct[]>([]);
  const router = useRouter();

  return (
    <>
      <div className="relative w-full h-full">
        {orders.length === 0 ? (
          <div className="flex items-center justify-center flex-col space-y-5 text-gray-600 h-2/3">
            <BsCartX className="text-[150px]" />
            <label>تا کنون سفارشی نداشته اید</label>
            <button
              onClick={() => router.push("/lists/all")}
              className="bg-prime-100 p-5 rounded-xl"
            >
              <p className="text-white">مشاهده لیست محصولات</p>
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 xl:grid-cols-2 gap-5 overflow-scroll 
                    absolute top-0 left-0 right-0 scrollbar-hide h-fit"
          >
            {orders.map((order, index) => (
              <button
                key={index}
                onClick={() => {
                  passHandler(true);
                  productsHandler(order.products);
                }}
                className={`w-full ${
                  order.done === 3 ? "bg-zinc-300" : "bg-white"
                } rounded-xl p-5 h-32`}
              >
                <div className="flex flex-col items-center justify-center sm:items-end sm:justify-between sm:flex-row">
                  <div className="flex flex-col space-y-5 ">
                    <div>{new Date(order.created_at).toLocaleString("fa")}</div>
                    <div className="flex flex-row space-x-2 items-center rtl:space-x-reverse">
                      <p>
                        {`${Intl.NumberFormat("fa-IR").format(
                          order.price
                        )} تومان`}
                      </p>
                      <small className="text-gray-600">{`( ${Intl.NumberFormat(
                        "fa-IR"
                      ).format(order.count)} سفارش )`}</small>
                    </div>
                  </div>
                  <div>
                    <p>{OrderStatusEnum[order.done]}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <HistoryModal open={pass} handler={passHandler} products={products} />
    </>
  );
}
