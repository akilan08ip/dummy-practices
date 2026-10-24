import { useState } from "react";
import { Button, Popover, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

interface StudentFilterProps {
  value: string[];
  onChange: (departments: string[]) => void;
}
function StudentFilter({ value, onChange }: StudentFilterProps) {
  const [open, setOpen] = useState(false);
  const [draftDepartments, setDraftDepartments] = useState<string[]>(value);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) 
      setDraftDepartments(value);
    setOpen(nextOpen);
  };
  const handleApply = () => {
    onChange(draftDepartments);
    setOpen(false);
  };
  
  const handleCancel = () => {
    setDraftDepartments([]);
    onChange([]);
    setOpen(false);
  };

  return (
    <Popover
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      content={
        <div style={{ width: 220 }}>
          <Select
            mode="multiple"
            placeholder="Select department"
            value={draftDepartments}
            onChange={setDraftDepartments}
            style={{ width: "100%" }}
            options={[
              { value: "IT", label: "IT" },
              { value: "IT", label: "IT" },
              { value: "IT", label: "IT" },
              { value: "CSE", label: "CSE" },
              { value: "MECH", label: "MECH" },
            ]}
          />
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 12,
            }}
          >
            <Button onClick={handleCancel} style={{ flex: 1 }}>
              Cancel
            </Button>

            <Button type="primary" onClick={handleApply} style={{ flex: 1 }}>
              Apply
            </Button>
          </div>
        </div>
      }
    >
      <Button icon={<FilterOutlined />}>Filter</Button>
    </Popover>
  );
}

export default StudentFilter;