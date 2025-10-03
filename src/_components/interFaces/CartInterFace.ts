import { IProduct } from "./productsInterFace"

export interface cartResponse {
  status: string
  message?:string
  numOfCartItems: number
  cartId: string
  data: Data
}

export interface Data {
  _id: string
  cartOwner: string
  products: items[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface items {
  count: number
  _id: string
  product: IProduct
  price: number
}
