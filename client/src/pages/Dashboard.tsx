import React from 'react';
import { useGetUserDashboardInfoQuery } from '../app/api/dashboardApi';

export interface DashboardInfo {
  id: number;
  full_name: string;
  verified: boolean;
  image?: string | undefined;
}

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useGetUserDashboardInfoQuery(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <p>User ID: {data.id}</p>
      <p>Full Name: {data.full_name}</p>
      <p>Verified: {data.verified ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Dashboard;
