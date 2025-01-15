import API from "@/api";
import ProductCard from "@/components/shared/ProductCard";
import ProductSearch from "@/components/shared/ProductSearch";
import { Category, Product } from "@/models/Product";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try
    {
      const response = await API.get("/products?limit=10");
      setLoading(false);
      setProducts(response.data.products);
    } catch (error)
    {
      console.error(error);
    }
  }

  const searchProduct = async (searchTerm: string) => {
    setLoading(true);
    Promise.all([
      API.get(`/products/search?q=${searchTerm}&limit=10`),
      new Promise((resolve) => setTimeout(resolve, 1000))
    ]).then(([response]) => {
      setLoading(false);
      setProducts(response.data.products);
    }).catch((error) => {
      console.error(error);
    });
  }

  const searchByCategory = async (category: Category | null) => {
    setLoading(true);
    Promise.all([
      API.get(`/products/category/${category?.slug}`),
      new Promise((resolve) => setTimeout(resolve, 1000))
    ]).then(([response]) => {
      setLoading(false);
      setProducts(response.data.products);
    }).catch((error) => {
      console.error(error);
    });
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    searchProduct((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    // ...
    getAllProducts();
    return () => {
      // ...
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ProductSearch handleSearch={handleSearch} handleCategoryChange={searchByCategory} className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4" />
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard.Loader key={index} />
            ))}
          </>
        ) : (
          <>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
