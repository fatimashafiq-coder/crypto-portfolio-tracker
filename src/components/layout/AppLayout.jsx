import Header from '../Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  const data = {
    icon: "💰",
    title: "Crypto Portfolio Tracker",
    subtitle: "Track your cryptocurrency investments with live Binance prices"
  };
  return (
    <>
      <Header data={data} />
      <Outlet />
    </>
  )
}

export default AppLayout
