import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { FaildLoggedUser, successLoggedUserResponse } from '@/_components/interFaces/loggedUserInterFace';

const handler = NextAuth({

providers: [
  CredentialsProvider({
    name: 'Nova Mart',
  
    credentials: {
      email: { label: "email", type: "email", placeholder: "your email" },
      password: { label: "Password", type: "password", placeholder: "your password" }
    },
    async authorize(credentials) {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
        method: 'POST',
        body: JSON.stringify({
            email:credentials?.email,
            password:credentials?.password
        }),
        headers: { 
                 

            "Content-Type": "application/json" }
      })
      const payload:successLoggedUserResponse|FaildLoggedUser = await res.json()
// if success
      if("token" in payload){
return{
  id:payload.user.email,
  user:payload.user,
  token:payload.token
}
      }else{
throw new Error(payload.message)
      }
     
    }
  })
],
callbacks:{
  jwt:({token,user})=>{
if(user){
  token.user=user.user
  token.token=user.token
}
    return token
  },
  session:({session,token})=>{
session.user=token.user;
session.token=token.token
return session;
  }
},
pages:{
signIn:"/login",
error:"/login"
},
secret:process.env.AUTH_SECRET

})

export { handler as GET, handler as POST }