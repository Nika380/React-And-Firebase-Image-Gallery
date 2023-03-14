import  './styles.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './user/Login';
import Register from './user/Register';
import { useContext } from 'react';
import {AuthContext} from './context/AuthContext';

function App() {


  const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    } else {
      return <>{children}</>
    }
  }

  const {currentUser} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
