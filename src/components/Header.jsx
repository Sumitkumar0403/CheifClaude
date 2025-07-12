import React from 'react'
import chefLogo from '../assets/chef.png'

function Header() {
  return (
    <div className='bg-white fs-3 fw-medium d-flex gap-2 justify-content-center sticky-top align-items-center header-custom-height border border-rounded '>
    <img src={chefLogo} alt="Chef Logo" width={40}/>
    <span> Chef Claude</span>
</div>
  )
}

export default Header