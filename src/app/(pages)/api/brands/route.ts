import { IBrands } from "@/_components/interFaces/Brandsinterface";
import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token =await getUserToken()
   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
    
        headers: {
            token:token+'',
          },
            cache: "force-cache"
      });
 const data: IBrands = await response.json();  
       return NextResponse.json(data)
    
}