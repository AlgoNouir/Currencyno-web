import PersonalModal from "@/components/login/personalDataModal";
import { axiosUser } from "@/core/axios";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { setNotif } from "@/store/core/slice";
import { getInitDataThunk } from "@/store/core/thunk";
import { notification } from "antd";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

export default function Gaurd(props: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const core = useAppSelector((store) => store.core);
  const account = useAppSelector((store) => store.account);

  const { serverStatus } = core;
  const notif = core.notif;

  const [api, contextHolder] = notification.useNotification();
  const [userModal, userModalHandler] = useState(false);
  const [pending, pendingHandler] = useState(true);

  useEffect(() => {
    // get init data
    if (serverStatus === "init") {
      dispatch(getInitDataThunk());
    } else if (serverStatus === "connect") {
      pendingHandler(false);
    }
    if (account.user !== undefined) {
      if (
        account.user.lName === undefined ||
        account.user.fName === undefined ||
        account.user.lName === undefined ||
        account.user.email === undefined ||
        account.user.address === undefined ||
        account.user.lName === null ||
        account.user.fName === null ||
        account.user.lName === null ||
        account.user.email === null ||
        account.user.address === null
      ) {
        userModalHandler(true);
      }
    }
    // show notif in web and delete
    if (notif.type !== "") {
      api[notif.type]({
        message: notif.title,
        description: notif.message,
      });
      dispatch(setNotif({ title: "", message: "", type: "" }));
    }
  }, [
    setNotif,
    dispatch,
    core,
    serverStatus,
    notif,
    api,
    userModalHandler,
    account,
    getInitDataThunk,
    pendingHandler,
    axiosUser
  ]);

  return (
    <>
      {props.children}
      {contextHolder}
      <PersonalModal open={userModal} handler={userModalHandler} />
      {pending === true ? (
        <div className="fixed z-20 top-0 left-0 right-0 bottom-0 bg-black/30 items-center justify-center flex flex-col">
          <div className="bg-white flex flex-col items-center justify-center space-y-5 p-5 rounded-xl">
            <CgSpinner className="text-8xl animate-spin" />
            <label unselectable="on">در حال بروزرسانی داده ها</label>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
