import ProductsClient from "./_ProductDisplay/ProductsClient";
import { IProduct } from "@/_components/interFaces/productsInterFace";

async function fetchProducts() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products?limit=1000",
    { next: { revalidate: 600000 } }
  );
  const data = await res.json();
  return data.data as IProduct[];
}

export default async function ProductsPage() {
  const products = await fetchProducts();

  return <ProductsClient initialProducts={products} />;
}
