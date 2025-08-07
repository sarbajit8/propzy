import React from 'react'
import { useParams } from 'react-router-dom'
import ResidentialLocation from './ResidentialLocation'
import CommercialLocation from './CommercialLocation'

const AddLocation = () => {
  const { prop, propdtl } = useParams()

  return (
    <div>
      {prop === 'Residential' && <ResidentialLocation prop={prop} propdetails={propdtl} />}
      {prop === 'Commercial' && <CommercialLocation prop={prop} propdetails={propdtl}  />}
      {prop !== 'Residential' && prop !== 'Commercial' && (
        <div>Invalid property type</div>
      )}
    </div>
  )
}


export default AddLocation;
