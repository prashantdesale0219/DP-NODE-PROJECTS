import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserList from './components/UserList';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/update-user" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
