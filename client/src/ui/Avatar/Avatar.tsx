import React from 'react';
import './Avatar.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

interface AvatarProps {
    image: string | null;
    size: number;
}

const Avatar: React.FC<AvatarProps> = ({ image, size }) => {
  const imageSize = `${size}px`;
  const isVerified = useAppSelector(
    (state: RootState) => state.auth.user?.isVerified,
  );

  return (
    <div className="Avatar" style={{ width: imageSize, height: imageSize }}>
      <div
        className="avatar-image-container"
        style={{ position: 'relative' }}
      >
        <img
          src={image || 'default_image_url'}
          alt="User Avatar"
          className="rounded-circle"
          style={{
            width: imageSize,
            height: imageSize,
            objectFit: 'cover',
          }}
        />

        {isVerified && (
          <span className="verified-badge">
            <FontAwesomeIcon
              icon={faCheckCircle as IconProp}
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '16px',
                fontSize: '21px',
              }}
            />
            <span className="tooltip">Verified</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
