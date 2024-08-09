import React from 'react';
import { Card } from 'react-bootstrap';

interface ProductCardProps {
  title: string;
  image: string | undefined;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, price }) => {
  return (
    <Card className='product-card' style={{ width: '18rem', margin: '1rem' }}>
      {image && <Card.Img variant='top' src={image} alt={title} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
