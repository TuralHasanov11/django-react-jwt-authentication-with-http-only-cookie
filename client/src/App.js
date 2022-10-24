import { Routes, Navigate, Route } from 'react-router-dom'
import './App.css';
import AuthMiddleware from './middleware/Auth';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import Home from './views/Home';
import User from './views/Auth/User'
import PersistLogin from './components/PersistLogin';
import Navbar from "./components/Navbar"


function App() {
  return <>
    <Navbar />
    <Routes>
      <Route path='/' element={<PersistLogin />}>
        <Route index exact element={<Home />}></Route>
        <Route path='/auth'>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='user' element={<AuthMiddleware />}>
            <Route index element={<User />}></Route>
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />}></Route>
    </Routes>
  </>
}

export default App;
