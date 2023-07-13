import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { setNotif } from "@/store/core/slice";
import { getInitDataThunk } from "@/store/core/thunk";
import { notification } from "antd";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function Gaurd(props: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const core = useAppSelector((store) => store.core);
    const account = useAppSelector((store) => store.account);

    const serverStatus = core.serverStatus;
    const notif = core.notif;

    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    useEffect(() => {
        // get init data
        if (serverStatus === "init") {
            dispatch(getInitDataThunk());
        } else if (serverStatus === "disconnect") {
            // router.push("error");
        }

        // show notif in web and delete
        if (notif.type !== "") {
            api[notif.type]({
                message: notif.title,
                description: notif.message,
            });
            dispatch(setNotif({ title: "", message: "", type: "" }));
        }
    }, [dispatch, serverStatus, notif, api]);

    return (
        <>
            {props.children}
            {contextHolder}
        </>
    );
}
