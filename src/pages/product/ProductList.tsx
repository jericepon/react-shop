import ProductCard from "@/components/shared/ProductCard";
import ProductSearch from "@/components/shared/ProductSearch";
import { Category, Product } from "@/models/Product";
import { getAllProducts, searchByCategory, searchProduct } from "@/store/features/Product";
import { AppDispatch, RootState } from "@/store/rootState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, list } = useSelector((state: RootState) => state.product);

  const handleSearchByCategory = async (category: Category | null) => {
    category && dispatch(searchByCategory(category));
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(searchProduct((e.target as HTMLInputElement).value));
  };

  useEffect(() => {
    // ...
    dispatch(getAllProducts());
    return () => {
      // ...
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <ProductSearch handleSearch={handleSearch} handleCategoryChange={handleSearchByCategory} className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4" />
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard.Loader key={index} />
            ))}
          </>
        ) : (
          <>
            {
              list.length === 0 ?
                <p className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center">No products found</p>
                :
                list.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
