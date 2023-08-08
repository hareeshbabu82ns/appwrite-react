import { Routes, Route } from "react-router-dom"

import Layout from './components/layout'
import SignUp from './components/signup'
import LogIn from './components/login'
import Home from "./components/homepage"
import Todo from "./pages/Todo/Todo";

function App() {
  return (
    <div className="app" style={{ display: 'flex' }}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todo />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
