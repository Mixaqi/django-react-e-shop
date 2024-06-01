import React, { useState, useEffect } from 'react';
import { useGetUserDashboardInfoQuery, useChangeUserDashboardInfoMutation, useUploadUserImageMutation } from '../app/api/dashboardApi';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface DashboardInfo {
  user: number;
  fullName?: string;
  verified?: boolean;
  image?: string | null;
}

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading, refetch } = useGetUserDashboardInfoQuery(Number(id));
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [changeUserDashboardInfo] = useChangeUserDashboardInfoMutation();
  const [uploadUserImage] = useUploadUserImageMutation();

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleFullNameUpdate = async () => {
    if (data) {
      try {
        await changeUserDashboardInfo({ id: Number(id), fullName }).unwrap();
        toast.success('Full name updated successfully');
        refetch();
      } catch (err) {
        toast.error('Failed to update full name');
      }
    }
  };

  const handleImageUpload = async () => {
    if (image && id) {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('image', image);

      try {
        await uploadUserImage(formData).unwrap();
        toast.success('Image uploaded successfully');
        refetch();
      } catch (err) {
        toast.error('Failed to upload image');
      }
    } else {
      toast.error('No image selected or ID is missing');
    }
  };

  useEffect(() => {
    if (data) {
      setFullName(data.fullName || '');
    }
  }, [data]);

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container text-danger">
        Error: {error.toString()}
      </div>
    );
  }

  if (!data) {
    return <div className="container">No data available</div>;
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="card my-5">
        <div className="card-body">
          <p className="card-text">User ID: {data.user}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text mb-0">Full Name: {data.fullName}</p>
            <div className="d-flex align-items-center" style={{ maxWidth: '50%' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter new full name"
                value={fullName}
                onChange={handleFullNameChange}
                style={{ marginRight: '10px' }}
              />
              <button className="btn btn-primary" onClick={handleFullNameUpdate} disabled={!fullName}>
                Update
              </button>
            </div>
          </div>
          <p className="card-text">Verified: {data.verified ? 'Yes' : 'No'}</p>
          <div className="mt-4">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button className="btn btn-primary mt-2" onClick={handleImageUpload} disabled={!image}>
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
