import { Input } from "antd";

interface StudentSearchProps {
  value: string;
  onChange: (value: string) => void;
}
const StudentSearch = ({
  value,
  onChange,
}: StudentSearchProps) => {
  return (
    <Input
      placeholder="Search student"
      allowClear
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={{ width: 150 }}
    />
  );
};
export default StudentSearch;