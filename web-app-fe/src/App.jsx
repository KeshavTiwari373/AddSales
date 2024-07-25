import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddSales from './pages/AddSales'
import TopSales from './pages/TopSales'
import TodayTRevenue from './pages/TodayTRevenue'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    //doing routing here with react router dom
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/addsales' element={<AddSales />}></Route>
          <Route exact path='/topsales' element={<TopSales />}></Route>
          <Route exact path='/totalrevenue' element={<TodayTRevenue />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
