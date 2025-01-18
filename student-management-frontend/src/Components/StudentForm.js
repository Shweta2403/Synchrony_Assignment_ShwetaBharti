import React, { useState, useEffect } from "react";

function StudentForm({ studentData, onAddStudent, onUpdateStudent, editMode }) {
  const [formData, setFormData] = useState(studentData);
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    studentClass: "",
  });

  useEffect(() => {
    setFormData(studentData);
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Validate field on change
    const updatedErrors = { ...errors };

    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!value.trim()) {
        updatedErrors.name = "Name is required";
      } else if (!nameRegex.test(value)) {
        updatedErrors.name = "Name should only contain alphabets";
      } else {
        updatedErrors.name = "";
      }
    }

    if (name === "age") {
      if (!value || isNaN(value) || value < 3 || value > 18) {
        updatedErrors.age = "Age must be a number between 3 and 18";
      } else {
        updatedErrors.age = "";
      }
    }

    if (name === "phoneNumber") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!value || !phoneRegex.test(value)) {
        updatedErrors.phoneNumber = "Phone number must be a 10 digit numeric";
      } else {
        updatedErrors.phoneNumber = "";
      }
    }

    if (name === "studentClass") {
      const classRegex = /^[0-9]+$/;
      if (!value || !classRegex.test(value) || value < 1 || value > 12) {
        updatedErrors.studentClass = "Class must be a number between 1 and 12";
      } else {
        updatedErrors.studentClass = "";
      }
    }

    setErrors(updatedErrors);
  };

  const validateForm = () => {
    let formErrors = { name: "", age: "", phoneNumber: "", studentClass: "" };

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name.trim()) {
      formErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      formErrors.name = "Name should only contain alphabets";
    }

    if (
      !formData.age ||
      isNaN(formData.age) ||
      formData.age < 3 ||
      formData.age > 18
    ) {
      formErrors.age = "Age must be a number between 3 and 18";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      formErrors.phoneNumber = "Phone number must be a 10 digit numeric";
    }

    const classRegex = /^[0-9]+$/;
    if (
      !formData.studentClass ||
      !classRegex.test(formData.studentClass) ||
      formData.studentClass < 1 ||
      formData.studentClass > 12
    ) {
      formErrors.studentClass = "Class must be a number between 1 and 12";
    }

    setErrors(formErrors);
    return Object.values(formErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editMode) {
        onUpdateStudent(formData);
      } else {
        onAddStudent(formData);
      }
      setFormData({ name: "", age: "", studentClass: "", phoneNumber: "" });
      setErrors({ name: "", age: "", phoneNumber: "", studentClass: "" });
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h4 className="card-title mb-3">
        {editMode ? "Edit Student" : "Add Student"}
      </h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="text-danger">{errors.name}</div>}

        <input
          type="text"
          name="age"
          className="form-control mb-2"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <div className="text-danger">{errors.age}</div>}

        <input
          type="text"
          name="studentClass"
          className="form-control mb-2"
          placeholder="Class"
          value={formData.studentClass}
          onChange={handleChange}
        />
        {errors.studentClass && (
          <div className="text-danger">{errors.studentClass}</div>
        )}

        <input
          type="text"
          name="phoneNumber"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="text-danger">{errors.phoneNumber}</div>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          {editMode ? "Update Student" : "Add Student"}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
