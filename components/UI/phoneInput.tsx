export default function PhoneInput(props: {
    value?: number | "";
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
                value={props.value && "0" + props.value}
                onChange={(e) => props.handler(parseInt(e.target.value) || "")}
                className="bg-gray-100 p-5 rounded-xl w-96"
            />
        </div>
    );
}
