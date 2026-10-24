import { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { Student } from "../types/student";

interface AddStudentProps {
  onSave: (student: Student) => void;
}

function AddStudent({ onSave }: AddStudentProps) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<Student>();

  const handleFinish = (student: Student) => {
    const { roll, ...rest } = student;

    onSave({
      roll: String(roll),
      ...rest
    });
    form.resetFields();
    setOpen(false);
  };

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        Add Student
      </Button>

      <Modal
        title="Add Student"
        open={open}
        onCancel={handleClose}
        onOk={form.submit}
        okText="Add Student"
        cancelText="Cancel"
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
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
        </Form>
      </Modal>
    </>
  );
}

export default AddStudent;