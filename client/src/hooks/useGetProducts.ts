import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDebounce } from "hooks/useDebounce";
import { RootState } from "store";
import { Product } from "types/Products";

export const useGetProducts = (searchTerm: string) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const cacheRef = useRef<Map<string, Product[]>>(new Map());

  const fetchProducts = async (
    debouncedSearchTerm: string,
    token: string | null
  ) => {
    const cacheKey = `${debouncedSearchTerm}-${token}`;
    if (cacheRef.current.has(cacheKey)) {
      return cacheRef.current.get(cacheKey) || [];
    }

    const config: AxiosRequestConfig = {
      headers: {},
      params: {},
    };

    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (debouncedSearchTerm) {
      config.params.search = debouncedSearchTerm;
    }

    const response = await axios.get(
      "http://localhost:3001/api/products",
      config
    );
    cacheRef.current.set(cacheKey, response.data);
    return response.data;
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts(debouncedSearchTerm, token);
        setProducts(fetchedProducts);
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

    loadProducts();
  }, [debouncedSearchTerm, token]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("search", searchTerm);
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate]);

  return useMemo(
    () => ({ products, loading, error }),
    [products, error, loading]
  );
};
