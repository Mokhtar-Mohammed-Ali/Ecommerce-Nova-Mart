"use server";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface RegisterResponse {
  message: string;
  statusMsg?: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export async function registerAction(
  values: RegisterPayload
): Promise<RegisterResponse> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { message: "Something went wrong, please try again." };
  }
}
