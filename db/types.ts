export type TProduct = {
  reference: number;
  image: string;
  name: string;
  price: number;
  stars?: number;
  created_at?: string;
};

export type TProductDb = TProduct & {
  id: number;
};
