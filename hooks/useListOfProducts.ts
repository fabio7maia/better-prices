import { productCrud } from "@/db/crud";
import { TProductDb } from "@/db/types";
import React from "react";

export const useListOfProducts = () => {
  const [products, setProducts] = React.useState<TProductDb[]>([]);

  React.useEffect(() => {
    const getListOfProducts = async () => {
      const products = await productCrud.getProducts();
    };
  }, []);

  return {};
};
