import React from 'react'
import Dashboard from '../../pages/dashboard/Dashboard'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
    <Header/>
    <Dashboard/>
    <Outlet/>
    </>
  )
}

export default AppLayout
