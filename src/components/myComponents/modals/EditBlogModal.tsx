/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import TextEditor from "../rich-text-editor";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateBlog } from "@/services/BlogService";
import { Blog } from "@/types/blog";

interface EditBlogModalProps {
  isUpdateBlogModalOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({
  isUpdateBlogModalOpen,
  onClose,
  blog,
}) => {
  const [editorContent, setEditorContent] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FieldValues>();

  // Watch the image field to conditionally display the current image
  const watchImage = watch("image");

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        category: blog.category,
        tags: blog.tags?.join(", ") || "",
        // image field is not reset here as we handle file input separately
      });
      // Set the default content for the editor
      setEditorContent(blog.content || "");
    } else {
      reset();
      setEditorContent("");
    }
  }, [blog, reset]);

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!blog) return; // Ensure blog data exists before saving

    const toastId = toast.loading("Updating Blog...", { duration: Infinity });

    try {
      let finalContent = editorContent; // Start with the current editor content
      const imagesToUpload: { src: string; originalTag: string }[] = [];

      // Regex to find image tags with data URLs or potentially local file references in content
      const imgRegex = /<img[^>]+src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;
      let match;
      while ((match = imgRegex.exec(editorContent)) !== null) {
        imagesToUpload.push({ src: match[1], originalTag: match[0] });
      }

      // Upload embedded images to Cloudinary
      for (const img of imagesToUpload) {
        try {
          const imageData = new FormData();
          imageData.append("file", img.src); // Send data URL directly
          imageData.append("upload_preset", upload_preset);
          imageData.append("cloud_name", cloud_name);

          const imageUploadResult = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
              method: "POST",
              body: imageData,
            }
          );

          if (!imageUploadResult.ok) {
            throw new Error("Embedded image upload failed");
          }

          const uploadedImage = await imageUploadResult.json();
          // Replace the original img tag with one using the Cloudinary URL
          const newImgTag = img.originalTag.replace(img.src, uploadedImage.url);
          finalContent = finalContent.replace(img.originalTag, newImgTag);
        } catch (error: any) {
          console.error("Error uploading embedded image:", error);
          toast.error("Failed to upload an embedded image.", { id: toastId });
          // Decide whether to continue or stop if an image upload fails
          // For now, we'll continue but log the error.
        }
      }

      // Handle thumbnail image upload
      const thumbnailFile = formData?.image?.[0]; // Get the selected file
      let thumbnailUrl = blog.image; // Start with the existing thumbnail URL

      if (thumbnailFile) {
        // If a new thumbnail file is selected
        const thumbnailData = new FormData();
        thumbnailData.append("file", thumbnailFile);
        thumbnailData.append("upload_preset", upload_preset);
        thumbnailData.append("cloud_name", cloud_name);

        const thumbnailUploadResult = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: thumbnailData,
          }
        );

        if (!thumbnailUploadResult.ok) {
          throw new Error("Thumbnail image upload failed");
        }
        const uploadedThumbnail = await thumbnailUploadResult.json();
        thumbnailUrl = uploadedThumbnail.url; // Use the new uploaded thumbnail URL
      }

      // Prepare updated blog data
      const updatedBlogData = {
        data: {
          title: formData.title,
          category: formData.category,
          content: finalContent, // Use the content with replaced image URLs
          image: thumbnailUrl, // Use the updated or existing thumbnail URL
          tags:
            formData.tags
              ?.split(",")
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag !== "") || [], // Ensure tags is always an array
        },
        blogId: blog._id,
      };

      // TODO: Implement the actual save logic (e.g., API call to update the blog)
      console.log("Attempting to save blog data:", updatedBlogData);

      // Call the update blog API (replace with your actual API call)
      const res = await updateBlog(updatedBlogData);
      console.log(res);

      if (!res.success) {
        toast.error(res?.message || "Failed to update blog.", { id: toastId });
      } else {
        toast.success(res?.message || "Blog updated successfully!", {
          id: toastId,
        });
        onClose();
        // If you need to refresh the blog list in the parent component,
        // you would call a prop function here, e.g., onBlogUpdated();
        // The onSaveSuccess prop was removed in recent changes.
      }
    } catch (error: any) {
      console.error("Error updating blog:", error);
      toast.error(error.message || "Something went wrong during update!", {
        id: toastId,
      });
    } finally {
      toast.dismiss(toastId); // Dismiss loading toast
    }
  };

  if (!isUpdateBlogModalOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/60 dark:bg-black/70 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Edit Blog Post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.title && typeof errors.title.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              {...register("category")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.category && typeof errors.category.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Thumbnail Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {blog?.image && !watchImage?.[0] && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Current Image:{" "}
                <a
                  href={blog.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 break-all"
                >
                  {blog.image}
                </a>
              </p>
            )}
            {errors.image && typeof errors.image.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors.image.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              {...register("tags")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.tags && typeof errors.tags.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors.tags.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1">
              Content
            </label>
            <TextEditor content={editorContent} setContent={setEditorContent} />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
