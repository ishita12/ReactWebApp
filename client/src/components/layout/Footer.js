import React from 'react'
import PropTypes from 'prop-types'

const footer = (props) => {
  return (
    <div className="bg-dark text-white mt-5 p-4 text-center">

Copyright &copy; {new Date().getFullYear()} RSO
   </div>
  )
}

export default footer;
