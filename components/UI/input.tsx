export default function Input(props: { title: string }) {
    return (
        <div className="flex flex-col space-y-2">
            <label className="text-xl">{props.title}</label>
            <input
                type="text"
                className="bg-gray-100 p-5 rounded-xl w-96"
                placeholder={props.title + " را وارد کنید"}
            />
        </div>
    );
}
