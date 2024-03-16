import React, { useState } from 'react'
import { IconButton } from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import "../styles/Navbar.scss"
import { setLogOut } from '../redux/state'

const Navbar = () => {

  const [dropDownMenu, setDropdownMenu] = useState(false)
  const user = useSelector((state) => state.user )  
  return (
    <div className='navbar'>
      <a href="/">
        <img src="/assets/logo.png" alt="" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder='Search...'/>
        <IconButton>
          <Search sx={{color:'#87CEEB'}} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? <a href='/create-listing' className='host'>Become a Host</a> : <a href='/login' className='host'>Become A Host</a>}
        <button className='navbar_right_account'>
          <Menu sx={{color:'grey'}}/>
          <Person sx={{color:'grey'}}/>
        </button>

        {dropDownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}
        
        {dropDownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="">Trip List</Link>
            <Link to="">Wish List</Link>
            <Link to="">Property List</Link>
            <Link to="">Reservation List</Link>
            <Link to="">Become A Host</Link>

            <Link to="/login">Log Out</Link>
          </div>
        )}

        
      </div>
    </div>
  )
}

export default Navbar