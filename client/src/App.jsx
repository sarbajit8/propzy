import React from 'react'
import Home from './pages/maincom/Home'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/maincom/Layout'
import AdminLayout from './components/superadmin/Layout'
import Dashboard from './components/superadmin/Dashboard'
import UsersList from './components/superadmin/UsersList'
import Properties from './components/superadmin/Properties'
import AddProperties from './components/superadmin/AddProperties'
import AddLocation from './components/superadmin/addproperty/AddLocation'
import AddPropertyDetails from './components/superadmin/addproperty/AddPropertyDetails'
import AddBasicDetails from './components/superadmin/addproperty/AddBasicDetails'
import UploadVideo from './components/superadmin/addproperty/UploadVideo'
import ProductPricing from './components/superadmin/addproperty/ProductPricing'
import AdminLogin from './pages/superadmin/auth/AdminLogin'
import ManageAdmin from './components/superadmin/ManageAdmin'
import CheckAuth from './components/common/check-auth'

const App = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>

         <Route path='/' element={     
        <CheckAuth>
        <Layout />
        </CheckAuth>
     }>

          <Route path='home' element={<Home />} />

     </Route>
 

         <Route path='admin' element={
      
        <AdminLayout />
     
     }>

          <Route path='properties' element={<Properties />}/>
          <Route path='users' element={<UsersList/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          {/* add properties from admin */}
        <Route path='add-products' element={<AddProperties/>}>
  <Route index element={<AddBasicDetails/>}/>
  <Route path='add-basic-details' element={<AddBasicDetails/>}/>
  <Route path='add-property-details/:prop/:propdtl' element={<AddPropertyDetails/>}/>
  <Route path='add-location/:prop/:propdtl' element={<AddLocation/>}/>
  <Route path='upload-video' element={<UploadVideo/>}/>
  <Route path='pricing' element={<ProductPricing/>}/>
</Route>
          <Route path='manage-admin' element={<ManageAdmin/>}/>


     </Route>
    


        <Route path='/admin-login' element={
        <AdminLogin />
     }/>
   
      </Routes>





      
      
      </div>
  )
}

export default App