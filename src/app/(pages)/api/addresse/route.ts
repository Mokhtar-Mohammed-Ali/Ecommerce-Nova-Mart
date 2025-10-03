import { UserAddressResponse } from "@/_components/interFaces/AdressesInterFace";
import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token =await getUserToken()
   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
        headers: {
            token:token+'',
          },
      });
 const data: UserAddressResponse = await response.json();  
       return NextResponse.json(data)
    
}