import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import SearchBar from "./components/SearchBar";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

function App() {
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    className: "",
    phoneNumber: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    getStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const handleAddStudent = (student) => {
    addStudent(student)
      .then((response) => {
        setStudents([...students, response.data]);
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setStudentData(studentToEdit);
    setEditMode(true);
    setStudentId(id);
  };

  const handleUpdateStudent = (student) => {
    updateStudent(studentId, student)
      .then((response) => {
        const updatedStudents = students.map((s) =>
          s.id === studentId ? response.data : s
        );
        setStudents(updatedStudents);
        setEditMode(false);
        setStudentData({ name: "", age: "", className: "", phoneNumber: "" });
      })
      .catch((error) => console.error("Error updating student:", error));
  };

  const handleDeleteStudent = (id) => {
    deleteStudent(id)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewAll = () => {
    setSearchQuery("");
    fetchStudents(); // Refresh all students when "View All" is clicked
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1
          className="display-4 heading"
          style={{ width: "auto", margin: "auto" }}
        >
          Student Management System
        </h1>
        <p className="lead text-secondary">
          Manage your student records efficiently
        </p>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <StudentForm
              studentData={studentData}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              editMode={editMode}
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex mb-3">
              <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
              <button
                className="btn btn-secondary view-all-btn ml-2"
                onClick={handleViewAll}
              >
                View All Students
              </button>
            </div>
            <StudentList
              students={filteredStudents}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <p>&copy; 2025 Student Management System</p>
      </div>
    </div>
  );
}

export default App;
