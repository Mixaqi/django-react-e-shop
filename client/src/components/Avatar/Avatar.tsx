import React from 'react';

interface AvatarProps {
    image: string | null;
    size: number;
}

const Avatar: React.FC<AvatarProps> = ({ image, size }) => {
    const imageSize = `${size}px`;

    return (
        <div className="Avatar" style={{ width: imageSize, height: imageSize }}>
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
        </div>
    );
};

export default Avatar;
