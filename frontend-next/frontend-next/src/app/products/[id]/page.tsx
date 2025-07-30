import { fetchProductById, fetchProducts } from '@/services/product';
import { notFound } from 'next/navigation';
import ProductClientSection from './ProductClientSection';

interface Props {
  params: { id: number };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = params;

  try {
    const res = await fetchProductById(id);
    const product = res.data;

    if (!product) return <h1>Failed to load</h1>;

    const keyword = product.category.split(' ')[0];
    const relatedRes = await fetchProducts(keyword);
    const related = relatedRes.data.filter(p => p.id !== product.id);

    return (
      <div className="container mx-auto px-4 py-6">
        <ProductClientSection product={product} related={related} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
