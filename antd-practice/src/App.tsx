import { useEffect, useState } from "react";
import StudentTable from "./components/StudentTable";
import StudentFilter from "./components/StudentFilter";
import StudentSearch from "./components/StudentSearch";
import AddStudent from "./components/AddStudent";
import { initialStudents } from "./data/students";
import type { Student } from "./types/student";

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setStudents(initialStudents);
      setStudentsLoading(false);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, []);
  const filteredStudents = students.filter((student) => {
    const searchValue = searchText.toLowerCase();
    const matchesSearch =
      student.roll.toLowerCase().includes(searchValue) ||
      student.name.toLowerCase().includes(searchValue);
    const matchesDepartment =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(student.dept);
    return matchesSearch && matchesDepartment;
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: 30,
        boxSizing: "border-box",
      }}
    >
      <h1>Student Details</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 30,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <StudentFilter
          value={selectedDepartments}
          onChange={setSelectedDepartments}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <StudentSearch value={searchText} onChange={setSearchText} />
          <AddStudent
            onSave={(student) => {
              setStudents((current) => [...current, student]);
            }}
          />
        </div>
      </div>

      <StudentTable
        students={filteredStudents}
        loading={studentsLoading}
        onEdit={(student) => {
          setEditingStudent(student);
        }}
        onDelete={(index) => {
          setStudents((current) =>
            current.filter((_, currentIndex) => currentIndex !== index),
          );
        }}
      />

      {/* <EditStudentDrawer
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onUpdate={(updatedStudent) => {
          setStudents((current) =>
            current.map((student) =>
              student.roll === editingStudent?.roll ? updatedStudent : student,
            ),
          );
          setEditingStudent(null);
        }}
      /> */}
    </div>
  );
};

export default App;