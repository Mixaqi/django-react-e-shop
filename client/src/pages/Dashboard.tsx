import React from 'react';
import { useGetUserDashboardInfoQuery } from '../app/api/dashboardApi';
import { useParams } from 'react-router-dom';

export interface DashboardInfo {
  id: number;
  full_name: string;
  verified: boolean;
  image?: string | undefined;
}

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetUserDashboardInfoQuery(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
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