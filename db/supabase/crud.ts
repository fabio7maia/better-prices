import { supabase } from "@/utils/supabase";
import { TProduct, TProductDb } from "../types";

export const productCrud = {
  getProduct: async ({
    id,
    reference,
  }: Partial<Pick<TProductDb, "id" | "reference">>) => {
    if (!id && !reference) {
      throw new Error("id or reference must be provided");
    }

    let result;

    if (id) {
      result = await supabase.from("products").select("*").eq("id", id);
    } else if (reference) {
      result = await supabase
        .from("products")
        .select("*")
        .eq("reference", reference);
    }

    if (result?.error) {
      throw result.error;
    }

    return result?.data?.[0] as TProductDb;
  },
  getProducts: async () => {
    const result = await supabase.from("products").select("*");

    if (result?.error) {
      throw result.error;
    }

    return result?.data as TProductDb[];
  },
  createProduct: async ({ reference, image, name, price, stars }: TProduct) => {
    console.log(
      `createProduct :: { ${reference}, ${image}, ${name}, ${price}, ${stars} }`
    );

    const result = await supabase
      .from("products")
      .insert({ reference, image, name, price, stars });

    if (result?.error) {
      throw result.error;
    }
  },
  updateProduct: async ({
    id,
    reference,
    image,
    name,
    price,
    stars,
  }: TProductDb) => {
    const result = await supabase
      .from("products")
      .update({ reference, image, name, price, stars })
      .eq("id", id);

    if (result?.error) {
      throw result.error;
    }
  },
  deleteProduct: async ({ id }: Pick<TProductDb, "id">) => {
    const result = await supabase.from("products").delete().eq("id", id);

    if (result?.error) {
      throw result.error;
    }
  },
};
