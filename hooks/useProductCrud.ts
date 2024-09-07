import { productCrud } from "@/db/crud";
import { TProduct, TProductDb } from "@/db/types";

export const useProductCrud = () => {
  return {
    createProduct: async (product: TProduct) => {
      await productCrud.createProduct(product);
    },
    deleteProduct: async ({ id }: Pick<TProductDb, "id">) => {
      await productCrud.deleteProduct({ id });
    },
    getProductById: async ({ id }: Pick<TProductDb, "id">) => {
      return await productCrud.getProduct({ id });
    },
    getProductByReference: async ({
      reference,
    }: Pick<TProductDb, "reference">) => {
      return await productCrud.getProduct({ reference });
    },
    getProducts: async () => {
      return await productCrud.getProducts();
    },
    updateProduct: async (product: TProductDb) => {
      return await productCrud.updateProduct(product);
    },
  };
};
