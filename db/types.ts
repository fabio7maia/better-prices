export type TProduct = {
  reference: number;
  image: string;
  name: string;
  price: number;
};

export type TProductDb = TProduct & {
  id: number;
};
