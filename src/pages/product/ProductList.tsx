import API from "@/api";
import ProductCard from "@/components/shared/ProductCard";
import { Input } from "@/components/ui/input";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {

  }

  useEffect(() => {
    console.log("ProductCard mounted");
    API.get("/products?limit=10").then((response) => {
      setLoading(false);
      setProducts(response.data.products);
    });
    return () => {
      console.log("ProductCard unmounted");
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard.Loader key={index} />
            ))}
          </>
        ) : (
          <>
            <>
              <div className="flex col-span-4 gap-4">
                <Input placeholder="Search product..." onKeyUp={handleSearch} />
              </div>
              {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
