import { useAppDispatch, useAppSelector } from "@/store/HOCs";
import { getInitDataThunk } from "@/store/core/thunk";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export default function Gaurd(props: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const serverStatus = useAppSelector((store) => store.core.serverStatus);

    const router = useRouter();
    useEffect(() => {
        console.log(serverStatus);

        // get init data
        if (serverStatus === "init") {
            dispatch(getInitDataThunk());
        } else if (serverStatus === "disconnect") {
            router.push("error");
        }
    }, [dispatch, serverStatus]);

    return <>{props.children}</>;
}
