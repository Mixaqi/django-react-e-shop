import React from 'react';

interface AvatarProps {
    image: string;
    size: number;
}

const Avatar: React.FC<AvatarProps> = ({ image, size }) => {
    const imageSize = `${size}px`;

    return (
        <div
            style={{
                width: imageSize,
                height: imageSize,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
            }}
        >
            <img
                src={image}
                alt="User Avatar"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
            />
        </div>
    );
};

export default Avatar;
