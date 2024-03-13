import React, { useState } from 'react'
import { IconButton } from "@mui/material"
import { Search, Person, Menu } from "@mui/icons-material"
import { useSelector } from 'react-redux'
import "../styles/Navbar.scss"

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
      </div>
    </div>
  )
}

export default Navbar