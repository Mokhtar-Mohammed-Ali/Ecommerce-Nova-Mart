import { ICategory } from "./CategoriesInterface";

export interface IProduct {
  _id: string;
  id: string;
  title: string;
  description: string;
  slug: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: ICategory;
  subcategory: ICategory[];
  brand: ICategory;
  createdAt: string; 
  updatedAt: string; 
}