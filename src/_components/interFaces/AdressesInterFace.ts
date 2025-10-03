export interface UserAddress {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface UserAddressResponse {
  results: number;
  status: "success" | "error"; 
  data: UserAddress[];
}
