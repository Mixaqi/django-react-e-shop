import React, { useState, useEffect, useRef } from 'react';
import {
  useGetUserDashboardInfoQuery,
  useChangeUserDashboardInfoMutation,
  useUploadUserImageMutation,
  useDeleteUserImageMutation,
} from 'app/api/dashboardApi';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from 'ui/Avatar/Avatar';
import AnonymousAvatar from 'assets/cat_anon.webp';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faKey } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import UserDeletionModal from 'components/Modals/UserDeletionModal/UserDeletionModal';
import Unauthorized from 'pages/auth/Unauthorized';
import ChangePasswordForm from 'components/Forms/ChangePasswordForm';
import Loader from 'ui/loaders/Loader';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

export interface DashboardInfo {
    user: number;
    fullName?: string;
    isVerified?: boolean;
    image?: string | null;
}

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, refetch } = useGetUserDashboardInfoQuery();
  const [fullName, setFullName] = useState('');
  const [imageAvatar, setImage] = useState<File | null>(null);
  const [changeUserDashboardInfo] = useChangeUserDashboardInfoMutation();
  const [uploadUserImage] = useUploadUserImageMutation();
  const [deleteUserImage] = useDeleteUserImageMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileInputValue, setFileInputValue] = useState('');

  const toggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const username = useAppSelector(
    (state: RootState) => state.auth.user?.username,
  );

  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm((prevState) => !prevState);
  };

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
      setFileInputValue(e.target.value);
    }
  };

  const handleFullNameUpdate = async () => {
    if (data) {
      try {
        await changeUserDashboardInfo({
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
    if (imageAvatar) {
      const formData = new FormData();
      formData.append('image', imageAvatar);

      try {
        await uploadUserImage(formData).unwrap();
        toast.success('Image uploaded successfully');
        refetch();
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setImage(null);
        setFileInputValue('');
      } catch (err) {
        toast.error('Failed to upload image');
      }
    } else {
      toast.error('No image selected or ID is missing');
    }
  };

  const handleDeleteImage = async () => {
    if (data && data.image) {
      try {
        await deleteUserImage({ id: Number(id) }).unwrap();
        toast.success('Image deleted successfully');
        refetch();
      } catch (err) {
        toast.error('Failed to delete image');
      }
    } else {
      toast.error('No image to delete');
    }
  };

  useEffect(() => {
    if (data) {
      setFullName(data.fullName || '');
    }
  }, [data]);

  if (isError) {
    return <Unauthorized />;
  }

  if (!data) {
    return <Loader />;
  }

  const userImage = data.image
    ? `${process.env.REACT_APP_BASE_URL}${data.image}`
    : AnonymousAvatar;

  return (
    <div className="container">
      <ToastContainer />
      <div className="card my-5">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h3>{username}</h3>
            <div className="d-flex align-items-center">
              <div className="dashboard-logic-buttons">
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleChangePasswordForm()}
                >
                  <FontAwesomeIcon icon={faKey as IconProp} />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => toggleModal(true)}
                >
                  <FontAwesomeIcon
                    icon={faTrash as IconProp}
                  />
                </button>
              </div>
            </div>
            {isModalOpen && (
              <UserDeletionModal
                closeModal={() => toggleModal(false)}
              />
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <Avatar image={userImage} size={150} />
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                  ref={fileInputRef}
                  value={fileInputValue}
                />
                <div className="image-interaction-buttons">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleImageUpload}
                    disabled={!imageAvatar}
                  >
                                        Upload Image
                  </button>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={handleDeleteImage}
                    disabled={!data.image}
                  >
                                        Delete Image
                  </button>
                </div>
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
                {showChangePasswordForm && (
                  <ChangePasswordForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
