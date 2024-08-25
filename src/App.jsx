import React from 'react'
import CourseList from './components/CourseList'
// import CourseForm from './components/CourseForm'
import InstanceForm from './components/InstanceForm'
import InstanceList from './components/InstanceList'

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <div>
      {/* <CourseForm /> */}
        <InstanceForm/>
      </div>
     
      <div>
         <CourseList />
         <InstanceList/>
      </div>
    </div>)
}

export default App