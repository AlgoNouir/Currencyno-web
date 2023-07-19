export default function PhoneInput(props: {
    phone?: number | "";
    handler: any;
    title?: string;
}) {
    return (
        <div className="flex flex-col space-y-2">
            {props.title === undefined ? (
                <></>
            ) : (
                <label className="text-xl">{props.title}</label>
            )}
            <input
                type="text"
                value={props.phone && "0" + props.phone}
                onChange={(e) => props.handler(parseInt(e.target.value) || "")}
                className="bg-gray-100 p-5 rounded-xl w-96"
            />
        </div>
    );
}
