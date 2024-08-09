import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from 'app/api/productApi';
import ProductCard from './PreviewProductCard';

const ProductList: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const { data: products, isLoading, isError } = useGetProductsByCategoryQuery(category || '');

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <div className='product-list'>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} title={product.title} image={product.image} price={product.price} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
