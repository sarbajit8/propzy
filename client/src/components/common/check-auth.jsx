import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    // If we're at the root path '/', redirect to '/home'
    if (location.pathname === '/') {
      navigate('/home')
    }
  }, [location.pathname, navigate])
  
  // Return the children components (Layout in this case)
  return children
}

export default CheckAuth