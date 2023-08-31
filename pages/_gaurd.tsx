import PersonalModal from "@/components/login/personalDataModal";
import { axiosUser } from "@/core/axios";
import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { setNotif } from "@/store/core/slice";
import { getInitDataThunk } from "@/store/core/thunk";
import { notification } from "antd";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function Gaurd(props: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const core = useAppSelector((store) => store.core);
  const account = useAppSelector((store) => store.account);

  const { serverStatus } = core;
  const notif = core.notif;

  const [api, contextHolder] = notification.useNotification();
  const [userModal, userModalHandler] = useState(false);

  useEffect(() => {
    // get init data
    console.log(serverStatus);

    if (serverStatus === "init") {
      // if (account.user)
      // axiosUser.defaults.headers.Authorization = account.user.access;
      dispatch(getInitDataThunk());
    } else if (serverStatus === "disconnect") {
      // router.push("error");
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
  }, [dispatch, core, notif, api, userModalHandler, account, getInitDataThunk]);

  return (
    <>
      {props.children}
      {contextHolder}
      <PersonalModal open={userModal} handler={userModalHandler} />
    </>
  );
}
