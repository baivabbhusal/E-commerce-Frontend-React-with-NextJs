import { getProductById } from "@/api/products";
import ProductDescription from "./_components/ProductDescription";
export async function generateMetadata({ params }) {
  const { productId } = await params;

  if (!productId) {
    return { title: "Product Not Found" };
  }

  try {
    const res = await getProductById(productId);
    const product = res?.data;

    return {
      title: product?.name || "Product",
      description: product?.description?.substring(0, 160) || "Buy this product online",
      keywords: product ? `${product.name},${product.brand},${product.category}` : "product",
    };
  } catch (error) {
    return { title: "Product" };
  }
}

export default async function ProductPage({ params }) {
  const { productId } = await params;
  let product = null;

  if (productId) {
    try {
      const res = await getProductById(productId);
      product = res?.data;
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }

  return <ProductDescription product={product} />;
}