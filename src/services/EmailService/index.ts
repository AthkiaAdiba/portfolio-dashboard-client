/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getAllEmails = async () => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/emails`, {
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["emails"],
      },
    });

    const emailData = await res.json();

    return emailData;
  } catch (error: any) {
    return Error(error);
  }
};
