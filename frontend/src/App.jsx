import { useState } from 'react'
import './App.css'
import Login from "../pages/login";
import Register from "../pages/register";
import {Routes, Route, Link} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  )
}

export default App
