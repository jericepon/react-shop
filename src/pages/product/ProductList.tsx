import ProductCard from "@/components/shared/ProductCard";
import ProductSearch from "@/components/shared/ProductSearch";
import { Category, Product } from "@/models/Product";
import { addToCart } from "@/store/features/Cart";
import { getAllProducts, searchByCategory, searchProduct } from "@/store/features/Product";
import { AppDispatch, RootState } from "@/store/rootState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authInfo } = useSelector((state: RootState) => state.auth);
  const { loading, list } = useSelector((state: RootState) => state.product);

  const handleSearchByCategory = async (category: Category | null) => {
    category && dispatch(searchByCategory(category));
  }

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    dispatch(searchProduct((e.target as HTMLInputElement).value));
  };

  const handleOnAddToCart = (productData: { quantity: number, product: Product }) => {
    const addToCartPayload = {
      userId: authInfo.id,
      product: {
        id: productData.product.id,
        quantity: productData.quantity
      }
    }
    dispatch(addToCart(addToCartPayload));
  }

  useEffect(() => { dispatch(getAllProducts()); }, []);

  return (
    <>
      <div className="p-4">
        <ProductSearch handleSearch={handleSearch} handleCategoryChange={handleSearchByCategory} className="lg:max-w-[650px] md:max-w-[70%] w-full mx-auto" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
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
                  <ProductCard key={product.id} product={product} onAddToCart={(quantity) => handleOnAddToCart({ quantity, product })} />
                ))
            }
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
