import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [course, setCourse] = useState({
    title: '',
    course_code: '',
    description: ''
  });

  const [courses, setCourses] = useState([]);
  const [instance, setInstance] = useState({
    year: '',
    semester: '',
    courseId: ''
  });

  // Fetch courses on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/courses', course, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCourse({
        title: '',
        course_code: '',
        description: ''
      });
      console.log("Course added:", response.data);
    } catch (error) {
      console.error("There was an error adding the course!", error);
    }
  };

  const handleInstanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/instances', instance, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setInstance({
        year: '',
        semester: '',
        courseId: ''
      });
      console.log("Instance added:", response.data);
    } catch (error) {
      console.error("There was an error adding the instance!", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 my-10">
      {/* Course Form */}
      <div className="w-full lg:w-1/2">
        <div className="text-3xl font-bold text-center mb-6">Create a New Course</div>
        <form onSubmit={handleCourseSubmit} className="bg-white p-6 shadow-lg rounded-lg">
          <div className="mb-5">
            <label htmlFor="courseTitle" className="block text-gray-800 font-medium mb-2">Course Title:</label>
            <input
              type="text"
              id="courseTitle"
              required
              value={course.title}
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="courseCode" className="block text-gray-800 font-medium mb-2">Course Code:</label>
            <input
              type="text"
              id="courseCode"
              value={course.course_code}
              required
              onChange={(e) => setCourse({ ...course, course_code: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="courseDescription" className="block text-gray-800 font-medium mb-2">Course Description:</label>
            <textarea
              id="courseDescription"
              value={course.description}
              required
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              rows="3"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
  
      {/* Instance Form */}
      <div className="w-full lg:w-1/2">
        <div className="text-3xl font-bold text-center mb-6">Add Course Instance</div>
        <form onSubmit={handleInstanceSubmit} className="bg-white p-6 shadow-lg rounded-lg">
          <div className="mb-5">
            <label htmlFor="courseId" className="block text-gray-800 font-medium mb-2">Select Course:</label>
            <select
              id="courseId"
              required
              value={instance.courseId}
              onChange={(e) => setInstance({ ...instance, courseId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="year" className="block text-gray-800 font-medium mb-2">Year:</label>
            <input
              type="number"
              id="year"
              required
              value={instance.year}
              onChange={(e) => setInstance({ ...instance, year: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="semester" className="block text-gray-800 font-medium mb-2">Semester:</label>
            <input
              type="number"
              id="semester"
              required
              value={instance.semester}
              onChange={(e) => setInstance({ ...instance, semester: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-purple-600 text-white font-bold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Instance
          </button>
        </form>
      </div>
    </div>
  );
}
  
export default Form;
