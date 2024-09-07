import { getDb } from "./db";
import { TProduct, TProductDb } from "./types";

export const productCrud = {
  getProduct: async ({
    id,
    reference,
  }: Partial<Pick<TProductDb, "id" | "reference">>) => {
    const db = await getDb();

    if (!id && !reference) {
      throw new Error("id or reference must be provided");
    }
    let statement;

    try {
      let result;

      if (id) {
        statement = await db.prepareAsync(
          "select * from products where id = $id"
        );

        result = await statement.executeAsync({
          $id: id,
        });
      } else if (reference) {
        statement = await db.prepareAsync(
          "select * from products where reference = $reference"
        );

        result = await statement.executeAsync({
          $reference: reference,
        });
      }

      return (await result?.getFirstAsync()) as TProductDb;
    } finally {
      await statement?.finalizeAsync();
    }
  },
  getProducts: async () => {
    const db = await getDb();

    const statement = await db.prepareAsync("select * from products");

    try {
      let result = await statement.executeAsync();

      return (await result.getAllAsync()) as TProductDb[];
    } finally {
      await statement.finalizeAsync();
    }
  },
  createProduct: async ({ reference, image, name, price }: TProduct) => {
    console.log(
      `createProduct :: { ${reference}, ${image}, ${name}, ${price} }`
    );
    const db = await getDb();

    const statement = await db.prepareAsync(
      "INSERT INTO products (reference, image, name, price) VALUES ($reference, $image, $name, $price)"
    );

    try {
      return await statement.executeAsync({
        $reference: reference,
        $image: image,
        $name: name,
        $price: price,
      });
    } finally {
      await statement.finalizeAsync();
    }
  },
  updateProduct: async ({ id, reference, image, name, price }: TProductDb) => {
    const db = await getDb();

    const statement = await db.prepareAsync(
      "update products set reference = $reference, image = $image, name = $name, price = $price where id = $id"
    );

    try {
      return await statement.executeAsync({
        $reference: reference,
        $image: image,
        $name: name,
        $price: price,
        $id: id,
      });
    } finally {
      await statement.finalizeAsync();
    }
  },
  deleteProduct: async ({ id }: Pick<TProductDb, "id">) => {
    const db = await getDb();

    const statement = await db.prepareAsync("delete products where id = $id");

    try {
      return await statement.executeAsync({
        $id: id,
      });
    } finally {
      await statement.finalizeAsync();
    }
  },
};
