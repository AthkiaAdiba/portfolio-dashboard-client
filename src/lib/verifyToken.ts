/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getNewToken } from "@/services/AuthService";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;
    cookieStore.set("accessToken", token);
  }

  return token;
};

// export const getValidToken = async (): Promise<string> => {
//   const cookieStore = await cookies();
//   let token = cookieStore.get("accessToken")?.value;

//   if (!token || (await isTokenExpired(token))) {
//     const { data } = await getNewToken();
//     token = data?.accessToken;

//     if (token) {
//       cookieStore?.set("accessToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production", // Better security
//         path: "/",
//         sameSite: "strict",
//       });
//     } else {
//       throw new Error("Failed to refresh token"); // Explicit error
//     }
//   }

//   return token || ""; // Avoid null/undefined
// };
