import React, { useState, ChangeEvent } from 'react';
import {useGetProducts} from '../../hooks/useGetProducts'; 
import { RootState } from 'store';
import { useSelector } from 'react-redux';

const Products: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { products, error } = useGetProducts(searchTerm, token);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
