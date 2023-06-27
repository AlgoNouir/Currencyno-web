import { useAppDispatch } from "@/store/HOCs";
import { getInitDataThunk } from "@/store/core/thunk";
import { ReactNode, useEffect } from "react";

export default function Gaurd(props: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // get init data
        dispatch(getInitDataThunk());
    }, [dispatch]);

    return <>{props.children}</>;
}
