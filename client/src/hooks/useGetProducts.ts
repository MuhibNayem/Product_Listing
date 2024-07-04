import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
}

export const useGetProducts = (
  searchTerm: string,
  token: string | null = null
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const config: AxiosRequestConfig = {
          headers: {},
        };

        if (token && config?.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (searchTerm) {
          config.params = { search: searchTerm };
        }

        const response = await axios.get(
          "http://localhost:3001/api/products",
          config
        );
        setProducts(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An error occurred while fetching data.");
        }
      }
    };

    fetchProducts();
  }, [searchTerm, token]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate]);

  return { products, error };
};
