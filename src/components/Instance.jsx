import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Instance() {
  const [instances, setInstances] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch instances
    axios.get('http://localhost:8080/api/instances')
      .then(response => {
        setInstances(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the instances!", error);
      });

    // Fetch courses
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleDeleteInstance = (id) => {
    axios.delete(`http://localhost:8080/api/instances/${id}`)
      .then(response => {
        console.log(response.data);
        setInstances(instances.filter(instance => instance.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the instance!", error);
      });
  };

  // Helper function to get course name by ID
  const getCourseNameById = (courseId) => {
    const course = courses.find(course => course.id === courseId);
    return course ? course.title : 'Unknown Course';
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Instances</h1>
      <table className="min-w-full table-auto border border-gray-300 shadow-lg">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Year</th>
            <th className="px-4 py-3 text-left">Semester</th>
            <th className="px-4 py-3 text-left">Course Name</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance, index) => (
            <tr
              key={instance.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-indigo-50 transition duration-200`}
            >
              <td className="px-4 py-2 border-t border-gray-300">
                {instance.year}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                {instance.semester}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                {getCourseNameById(instance.courseId)}
              </td>
              <td className="px-4 py-2 border-t border-gray-300">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200"
                  onClick={() => handleDeleteInstance(instance.id)}
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

export default Instance;
