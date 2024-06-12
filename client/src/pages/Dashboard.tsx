import React, { useState, useEffect } from 'react';
import {
    useGetUserDashboardInfoQuery,
    useChangeUserDashboardInfoMutation,
    useUploadUserImageMutation,
} from '../app/api/dashboardApi';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface DashboardInfo {
    user: number;
    fullName?: string;
    verified?: boolean;
    image?: string | null;
}

const Dashboard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading, refetch } = useGetUserDashboardInfoQuery(
        Number(id),
    );
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [changeUserDashboardInfo] = useChangeUserDashboardInfoMutation();
    const [uploadUserImage] = useUploadUserImageMutation();

    const MAX_FILE_SIZE = parseInt(
        process.env.REACT_APP_AVATAR_MAX_FILE_SIZE || '2097152',
    );

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > MAX_FILE_SIZE) {
                toast.error('File size exceeds the maximum limit');
                return;
            }
            setImage(selectedFile);
        }
    };

    const handleFullNameUpdate = async () => {
        if (data) {
            try {
                await changeUserDashboardInfo({
                    id: Number(id),
                    fullName,
                }).unwrap();
                toast.success('Full name updated successfully');
                refetch();
            } catch (err) {
                toast.error('Failed to update full name');
            }
        }
    };

    const handleImageUpload = async () => {
        if (image) {
            const formData = new FormData();
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
                <div className="card-header">
                    <h3>User Dashboard</h3>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}${data.image || 'default_image_url'}`}
                                alt="User Avatar"
                                className="rounded-circle"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="mt-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="form-control"
                                />
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={handleImageUpload}
                                    disabled={!image}
                                >
                                    Upload Image
                                </button>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label htmlFor="userId" className="form-label">
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    id="userId"
                                    className="form-control"
                                    value={data.user}
                                    readOnly
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="fullName"
                                    className="form-label"
                                >
                                    Full Name
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="fullName"
                                        className="form-control"
                                        placeholder="Enter new full name"
                                        value={fullName}
                                        onChange={handleFullNameChange}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleFullNameUpdate}
                                        disabled={!fullName}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="verified"
                                    className="form-label"
                                >
                                    Verified
                                </label>
                                <input
                                    type="text"
                                    id="verified"
                                    className="form-control"
                                    value={data.verified ? 'Yes' : 'No'}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
