import {  Skeleton, Table } from "antd";

import type { Student } from "../types/student";
import DeleteStudentModal from "./DeleteStudentModal";
import EditStudent from "./EditStudentModal";

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (index : number) => void;
}
const StudentTable =({
  students,
  loading,
  onEdit,
  onDelete,
}: StudentTableProps) => {
  const columns = [
    {
      title: "Roll Number",
      dataIndex: "roll",
      key: "roll",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Department",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, student: Student, index : number) => (
        <>
          <EditStudent onUpdate={() => onEdit(student)} student={ student} />
          
         <DeleteStudentModal name={student.name} onConfirm={() => onDelete(index)} />
        </>
      ),
    },
  ];
  if (loading) {
    return <Skeleton active title={false} paragraph={{ rows: 6 }} />;
  }

  return (
    <Table<Student>
      rowKey="roll"
      columns={columns}
      dataSource={students}
      bordered
      pagination={{
        pageSize: 10,
      }}
    />
  );
}

export default StudentTable;