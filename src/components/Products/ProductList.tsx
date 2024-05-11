import { SearchParams } from "@/app/(website)/(pages)/products/(all-products)/page";
import ProductCard from "./ProductCard";
import appwriteProductService from "@/appwrite/appwriteProductService";
import { PaginationComponent } from "../Shared/Pagination/PaginationComponent";

const ProductList = async ({
  p_category,
  c_category,
  n_category,
  keyword,
  page,
  resultPerPage,
}: SearchParams) => {
  const products = await appwriteProductService.getProductList({
    p_category,
    c_category,
    n_category,
    keyword,
    page,
    resultPerPage,
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

          <PaginationComponent
            basePath="/products"
            currentPageNumber={Number(page)}
            resultPerPage={Number(resultPerPage)}
            totalItems={products?.total}
            extraSearchParams={{ p_category, c_category, n_category }}
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
