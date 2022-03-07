import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Detail from './pages/detail/Detail';
import Login from './pages/login/Login';
import Home from './pages/home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>

      <Router>
          <Header />
          <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/detail/:id' element={<Detail />} />
          </Routes>
        </div>
       
      </Router>
      
      <ToastContainer />

    </>


  );
}

export default App;

