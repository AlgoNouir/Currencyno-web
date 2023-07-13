function Icon(props: {}) {
    return (
        <div className="w-20 h-20 items-center justify-center flex bg-bg-200/50 rounded-xl"></div>
    );
}

export default function Footer() {
    return (
        <div
            className="bg-bg-300 rounded-t-xl w-screen flex 
            items-center justify-end flex-col p-5 pt-16 space-y-5"
        >
            <div className="grid grid-cols-5 gap-5">
                <Icon />
                <Icon />
                <Icon />
                <Icon />
                <Icon />
            </div>
            <div className="border-b w-1/2 border-black/40" />
            <p>
                تمام حقوق این وبسایت متعلق به شرکت تحلیلگران نگرش نو تجارت است.
                ۱۴۰۳
            </p>
        </div>
    );
}
