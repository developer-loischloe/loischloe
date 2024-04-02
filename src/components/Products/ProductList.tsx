import { SearchParams } from "@/app/(pages)/products/(products)/page";
import ProductPagination from "./Product/ProductPagination";
import ProductCard from "./ProductCard";
import appwriteProductService from "@/appwrite/appwriteProductService";

export const productPerPage = 8;

const ProductList = async ({
  p_category,
  c_category,
  n_category,
  keyword,
  page,
}: SearchParams) => {
  const products = await appwriteProductService.getProductList({
    p_category,
    c_category,
    n_category,
    keyword,
    page,
    productPerPage,
  });

  return (
    <>
      {products?.documents?.length ? (
        <div className="space-y-10">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.documents?.map((product: any) => (
              <ProductCard product={product} key={product?.$id} />
            ))}
          </div>
          <ProductPagination
            total={products?.total}
            {...{
              p_category,
              c_category,
              n_category,
              keyword,
              page,
              productPerPage,
            }}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center">
          <h5 className="notfound">Oops! Product not found.</h5>
          <p>Choose a different category or search for products.</p>
        </div>
      )}
    </>
  );
};

export default ProductList;
