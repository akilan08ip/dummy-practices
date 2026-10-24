import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteStudentProps {
  name: string;
  onConfirm: () => void;
}
function DeleteStudentModal({
  name,
  onConfirm,
}: DeleteStudentProps) {

  const confirm = () => {
    Modal.confirm({
      title: "Warning",
      content: `${name} are you want to delete it?`,
      onOk: onConfirm,
      centered : true
    })
  }
  return <Button
    danger
    icon={<DeleteOutlined />}
    style={{ marginLeft: 8 }}
    onClick={confirm}
  />
}
export default DeleteStudentModal;