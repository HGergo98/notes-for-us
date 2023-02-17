import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardFooter from '../DashboardFooter/DashboardFooter';
import DashboardHeader from '../DashboardHeader/DashboardHeader';

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className='dash-container'>
        <Outlet />
      </div>
      <DashboardFooter />
    </>
  );
};

export default DashboardLayout;