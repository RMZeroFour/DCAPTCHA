import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Form from './components/Form'
import SortingTask from './TasksList/SortingTask'
import ColorSelectionTask from './TasksList/ColorSelectionTask'
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (
    <>
      <Navbar/>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Form/>}/>
          <Route path="/task" element = {<SortingTask/>}/>
          <Route path="/task2" element = {<ColorSelectionTask/>}/>

        </Routes>
     </BrowserRouter>
     
     <Footer/>
    </>
  )
}

export default App
