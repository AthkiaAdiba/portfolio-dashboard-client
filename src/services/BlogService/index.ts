/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createBlog = async (data: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/create-blog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );

    const blogData = await res.json();
    revalidateTag("blogs");

    return blogData;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
      next: {
        tags: ["blogs"],
      },
    });

    const blogData = await res.json();

    return blogData;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      next: {
        tags: ["blogs"],
      },
    });

    const blogData = await res.json();

    return blogData;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlog = async (data: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${data.blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data.data),
      }
    );

    const blogData = await res.json();
    revalidateTag("blogs");

    return blogData;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteBlog = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const blogData = await res.json();
    revalidateTag("blogs");
    return blogData;
  } catch (error: any) {
    return Error(error);
  }
};
