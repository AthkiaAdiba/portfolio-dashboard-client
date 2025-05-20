/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { TProject } from "@/types/project";
import { revalidateTag } from "next/cache";

export const createProject = async (data: TProject) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/create-project`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      }
    );

    const projectData = await res.json();
    revalidateTag("projects");

    return projectData;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllProject = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      next: {
        tags: ["projects"],
      },
    });

    const projectsData = await res.json();

    return projectsData;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleProject = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        next: {
          tags: ["projects"],
        },
      }
    );

    const projectData = await res.json();

    return projectData;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProject = async (data: any) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${data.projectId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data.data),
      }
    );

    const projectData = await res.json();
    revalidateTag("projects");

    return projectData;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteProject = async (id: string) => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const projectData = await res.json();
    revalidateTag("projects");
    return projectData;
  } catch (error: any) {
    return Error(error);
  }
};
