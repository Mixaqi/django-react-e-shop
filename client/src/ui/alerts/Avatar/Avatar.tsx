import React from 'react';
import classNames from 'classnames';

export interface IAvatarProps {
    className: string;
    size?: number;
    title?: string;
    image?: string;
}

export const Avatar: React.FC<IAvatarProps> = ({
    className,
    size = 46,
    image,
    title,
}) => {
    const sizeInner = `${size - 8}px`;
    const sizeWrapper = `${size}px`;
    const sizeTitle = `${size / 2}px`;
    return (
        <div
            className={classNames('Avatar', className)}
            style={{ width: sizeInner, height: sizeInner }}
        >
            <div
                className={classNames('AvatarInner')}
                style={{ width: sizeInner, height: sizeInner }}
            >
                {image && (
                    <img
                        className="AvatarFace"
                        src={image}
                        alt=""
                        width={sizeInner}
                        height={sizeInner}
                    />
                )}
                {title && (
                    <div className="AvatarFace" style={{ fontSize: sizeTitle }}>
                        {title}
                    </div>
                )}
                <div
                    className="AvatarBorder"
                    style={{ width: sizeWrapper, height: sizeWrapper }}
                ></div>
            </div>
        </div>
    );
};
