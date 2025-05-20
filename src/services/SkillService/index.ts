/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createSkill = async (data: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/create-skill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );

    const skillData = await res.json();
    revalidateTag("skills");

    return skillData;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllSkills = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      next: {
        tags: ["skills"],
      },
    });

    const skillsData = await res.json();

    return skillsData;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleSkill = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        next: {
          tags: ["skills"],
        },
        headers: {
          Authorization: token,
        },
      }
    );

    const skillData = await res.json();

    return skillData;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateSkill = async (data: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${data.skillId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data.data),
      }
    );

    const skillData = await res.json();
    revalidateTag("skills");

    return skillData;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSkill = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const skillData = await res.json();
    revalidateTag("skills");
    return skillData;
  } catch (error: any) {
    return Error(error);
  }
};
