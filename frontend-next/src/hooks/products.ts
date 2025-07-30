import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByNameAndCategory,
  Product,
} from '@/services/product';
import { searchProducts } from '@/services/product';

export const useProducts = (category?: string) =>
  useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: async () => {
      if(category=='All'){
        const res=await fetchProducts();
        return res.data;
      }
      else{
      const res = await fetchProducts(category);
      return res.data;
      }
    },
    retry:1,
  });

export const useFilteredProducts = (name: string, category: string) =>
  useQuery<Product[]>({
    queryKey: ['filtered-products', name, category],
    queryFn: async () => {
      if(category=='All'){
        const res= await fetchProducts();
        return res.data;
      }
      else{
      const res = await searchProductsByNameAndCategory(name, category);
      return res.data;} // ✅ extract data from Axios response
    },
    enabled: !!name || !!category,
  });

export const useProduct = (id: number) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

export const useCreateProduct = () =>
  useMutation({
    mutationFn: (data: Partial<Product>) => createProduct(data),
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      updateProduct(id, data),
  });

export const useDeleteProduct = () =>
  useMutation({
    mutationFn: (id: number) => deleteProduct(id),
  });

  export const useRelatedProducts = (name: string, excludeId?: number) =>
    useQuery<Product[]>({
      queryKey: ['related-products', name],
      queryFn: async () => {
        const res = await searchProducts(name);
        const products = res.data;
        return excludeId ? products.filter((p) => p.id !== excludeId) : products;
      },
      enabled: !!name, // only run when name is non-empty
    });