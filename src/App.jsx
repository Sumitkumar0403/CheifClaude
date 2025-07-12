import { useState } from 'react'
import Header from './components/Header'
import Main from "./components/Main"
import './App.css'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
    <Main/>
    </>
  )
}

export default App
