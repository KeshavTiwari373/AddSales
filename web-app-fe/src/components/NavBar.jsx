import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);
    const obj = user.user;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate('/login');
    }

    // created navbar and Linked it to all the pages
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <span className="navbar-brand whitetext">SALES APP</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {(Object.keys(obj).length !== 0) ? <Link to='/addsales' className="nav-link whitetext" >ADD SALES</Link> : ''}
                            {(Object.keys(obj).length !== 0) ? <Link to='/topsales' className="nav-link whitetext" >TOP 5 SALES</Link> : ''}
                            {(Object.keys(obj).length !== 0) ? <Link to='/totalrevenue' className="nav-link whitetext" >TODAY&rsquo;S TOTAL REVENUE</Link> : ''}
                            {(Object.keys(obj).length === 0) ? <Link to='/login' className="nav-link whitetext" >LOGIN</Link> : ''}
                            {(Object.keys(obj).length === 0) ? <Link to='/register' className="nav-link whitetext" >REGISTER</Link> : ''}
                            {(Object.keys(obj).length !== 0) ? <Link to='' onClick={() => logout()} className="nav-link whitetext " >LOGOUT</Link> : ''}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar