import React from 'react'
import ResidentialPropertyDetails from './ResidentialPropertyDetails'
import { useParams } from 'react-router-dom'

const AddPropertyDetails = () => {
    const { prop, propdtl } = useParams()

  return (
    <div>
      <ResidentialPropertyDetails prop={prop} propdtl={propdtl}/>
    </div>
  )
}

export default AddPropertyDetails