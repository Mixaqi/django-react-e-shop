import { useState} from 'react'
import { useGetUserDashboardInfoQuery } from '../app/api/dashboardApi'
import { useParams } from 'react-router-dom'

export interface DashboardInfo {
  user: number;
  fullName?: string;
  verified?: boolean;
  image?: string | null;
}

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetUserDashboardInfoQuery(Number(id));
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    console.log('Uploaded image:', image);
    setImage(null);
  };

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
      <div className="card my-5">
        <div className="card-body">
          <p className="card-text">User ID: {data.user}</p>
          <p className="card-text">Full Name: {data.fullName}</p>
          <p className="card-text">Verified: {data.verified ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div className="card my-5">
        <div className="card-body">
          <h5 className="card-title">Upload Image</h5>
          <div className="mb-3">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {image && (
            <div className="mb-3">
              <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
          )}
          <button className="btn btn-primary" onClick={handleUpload} disabled={!image}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;