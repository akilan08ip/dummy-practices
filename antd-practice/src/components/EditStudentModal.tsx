import {  useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, Select, Skeleton } from "antd";
import {
  EditOutlined,
} from "@ant-design/icons";
import type { Student } from "../types/student";

interface EditStudentDrawerProps {
  student: Student; onUpdate: (student: Student) => void;
}
const EditStudent = ({
  student, onUpdate,
}: EditStudentDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const[form] = Form.useForm()

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = (values: Student) => {
    const{roll, ...rest}= student;
    onUpdate({

      roll: String(values.roll),
      ...rest
    });
    handleClose();
  };
  
  return (
    <>
      <Button
        icon={<EditOutlined />}
        onClick={() => { setOpen(true);
          setLoading(true);
          setTimeout(() => {setLoading(false);
          }, 2000);
        }}
      />

      <Drawer
        title="Edit Student"
        placement="right"
        width={400}
        forceRender
        open={open}
        onClose={handleClose}
      >
        {loading ? (
          <Skeleton active title paragraph={{ rows: 3 }} />
        ) : (
          <Form
            id="edit-student-form"
            form={form}
            layout="vertical"
            initialValues={student ?? undefined}
            onFinish={handleFinish}
          >
            <Form.Item
              label="Roll Number"
              name="roll"
              rules={[
                {
                  required: true,
                  message: "Please enter roll number",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={1}
                precision={0}
                placeholder="Enter roll number"
              />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter name",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              label="Department"
              name="dept"
              rules={[
                {
                  required: true,
                  message: "Please select department",
                },
              ]}
            >
              <Select
                placeholder="Select department"
                options={[
                  { value: "IT", label: "IT" },
                  { value: "CSE", label: "CSE" },
                  { value: "MECH", label: "MECH" },
                ]}
              />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
              <Button htmlType="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" >
                save
              </Button>
            </div>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default EditStudent;