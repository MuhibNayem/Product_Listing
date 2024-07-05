import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "store";
import { Product } from "types/Products";

export const useGetProductById = () => {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const config: AxiosRequestConfig = {
          headers: {},
        };

        if (token && config?.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          `http://localhost:3001/api/products/${id}`,
          config
        );
        setProduct(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, token]);

  return { product, error, loading };
};
