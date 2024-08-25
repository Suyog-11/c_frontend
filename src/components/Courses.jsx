import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        console.log(response.data)
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleDeleteCourse = (id) => {
    axios.delete(`http://localhost:8080/api/courses/${id}`)
      .then(response => {
        console.log(response.data);
        setCourses(courses.filter(course => course.id !== id))
      })
      .catch(
        error => { console.log(error) }
      )
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Courses</h1>
      <table className="min-w-full table-auto border border-gray-300 shadow-lg">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Course Code</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={course.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-indigo-50 transition duration-200`}
            >
              <td className="px-4 py-2 border-t border-gray-300">
                {course.title}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                {course.course_code}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                {course.description}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}  

export default Courses;
