export default function Input(props: {
    title: string;
    value?: string | number;
    handler: any;
}) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-xl">{props.title}</label>
            <input
                value={props.value}
                onChange={(e) => props.handler(e.target.value)}
                type="text"
                className="bg-gray-100 p-5 rounded-xl 2xl:w-96 w-80"
                placeholder={props.title + " را وارد کنید"}
            />
        </div>
    );
}
