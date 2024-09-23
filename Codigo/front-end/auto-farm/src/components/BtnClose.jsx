import React from 'react'
import { FaTimes } from 'react-icons/fa'

const BtnClose = ({fecharModal}) => {
  return (
    <button
            onClick={fecharModal}
            className="absolute top-4 right-4 b rounded text-2xl text-gray-500 hover:text-red-500 transition duration-300"
            >
                <FaTimes />
            </button>
  )
}

export default BtnClose