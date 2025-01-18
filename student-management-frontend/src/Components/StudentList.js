import React from "react";
import "./StudentList.css";

const StudentList = ({ students, onEditStudent, onDeleteStudent }) => {
  return (
    <table className="table table-striped table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Class</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.studentClass}</td>
            <td>{student.phoneNumber}</td>
            <td>
              <button
                className="btn btn-warning btn-sm action-btn"
                onClick={() => onEditStudent(student.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm action-btn"
                onClick={() => onDeleteStudent(student.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentList;
