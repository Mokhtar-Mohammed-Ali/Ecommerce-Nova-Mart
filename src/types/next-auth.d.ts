
import { LoggedUser } from "@/_components/interFaces/loggedUserInterFace";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: LoggedUser;
  }

  interface User {
    user: LoggedUser;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: LoggedUser;
    token?: string;
  }
}
