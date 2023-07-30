import { SettingScreen } from "@/pages/profile";
import Modal from "../UI/modal";

export default function SettingDataModal(props: {
  open: boolean;
  handler: any;
}) {
  return (
    <Modal {...props} title="تکمیل اطلاعات کاربری">
      <SettingScreen />
    </Modal>
  );
}
