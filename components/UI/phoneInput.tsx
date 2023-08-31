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
        onChange={(e) =>
          props.handler(
            e.target.value === "0" ? 0 : parseInt(e.target.value) || ""
          )
        }
        className="bg-gray-100 p-5 rounded-xl  2xl:w-96 w-80"
        placeholder="شماره تلفن را وارد کنید."
      />
    </div>
  );
}
