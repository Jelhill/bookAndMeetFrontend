import React, { useEffect } from 'react'
import { Link, withRouter } from "react-router-dom"
import logo from "../Images/meeting.png"
import { connect } from 'react-redux'
import { updateStateForHeader, showSignup, showSignIn, showLogout } from "../Actions/userActions"
// import Login from './Modals/login'
// import Signup fro./Modals/Signupnup'
import { getWithExpiry } from "../Actions/helperFunctions"
import Logout from './Modals/Logout'

const Header = (props) => {    
    // const handleSignIn = () => props.showSignin(true)
    // const openSignUpModal = () => props.showSignup(true)
    const openLogOutModal = () => props.showLogout(true)

    useEffect(() => {
        const response = getWithExpiry("token")
        props.updateStateForHeader(response)
    })

    const {firstname} = props
    return (
        <div className="headerPurpleDiv">
            <div className="headerIconDiv">
                <div className="logoWrapper">
                    <Link to="/"><img src={logo} alt="Logo"/></Link>
                    <h2 className="logo">boardroom</h2>                    
                </div>     
                <ul>
                    <li><Link to="#">{firstname}</Link></li>
                   <li className="addAdminPersonnel1"><Link to = "/addadminform" className = "adminPersonnel">Admin</Link></li>
                    <li><Link to="#" onClick={openLogOutModal}>Logout</Link></li>
                    <Logout />
                </ul> 
            </div>          
        </div>
    )
}


const mapStateToProps = (state) => {
    const { userReducer } = state
    return {
        isLoggedIn: userReducer.isLoggedIn,
        firstname: userReducer.userFirstname,
        id: userReducer.userid,
        showSignUp: userReducer.showSignUp,
        showSuccessfullRegModal:userReducer.showSuccessfullRegModal,
        showSignIn: userReducer.showSignIn,
        showLogoutModal : userReducer.showLogOut
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStateForHeader: (values) => dispatch(updateStateForHeader(values)),
        showSignin: (values) => dispatch(showSignIn(values)),
        showSignup: (values) => dispatch(showSignup(values)) ,
        showLogout:(value) => dispatch(showLogout(value))   
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));