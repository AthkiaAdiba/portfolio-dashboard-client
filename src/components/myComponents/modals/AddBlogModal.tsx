/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextEditor from "../rich-text-editor";
import { FiX } from "react-icons/fi";
import { toast } from "sonner";
import { createBlog } from "@/services/BlogService";

const AddBlogModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Adding Blog", { duration: Infinity });

    formData.tags = tags;
    let finalContent = content;
    const imagesToUpload: { src: string; originalTag: string }[] = [];

    const imgRegex = /<img[^>]+src="(data:image\/[^;]+;base64,[^"]+)"[^>]*>/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      imagesToUpload.push({ src: match[1], originalTag: match[0] });
    }

    for (const img of imagesToUpload) {
      try {
        const imageData = new FormData();
        imageData.append("file", img.src);
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
        const newImgTag = img.originalTag.replace(img.src, uploadedImage.url);
        finalContent = finalContent.replace(img.originalTag, newImgTag);
      } catch (error: any) {
        console.error("Error uploading embedded image:", error);
        toast.error("Failed to upload an embedded image.", { id: toastId });
      }
    }

    const thumbnailData = new FormData();
    const rowImage = formData?.image[0];
    let thumbnailUrl = "";
    if (rowImage) {
      thumbnailData.append("file", rowImage);
      thumbnailData.append("upload_preset", upload_preset);
      thumbnailData.append("cloud_name", cloud_name);

      const imageUploadResult = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: thumbnailData,
        }
      );

      if (!imageUploadResult.ok) {
        throw new Error("Thumbnail image upload failed");
      }
      const uploadedThumbnail = await imageUploadResult.json();
      thumbnailUrl = uploadedThumbnail.url;
    }

    const blogData = {
      title: formData.title,
      content: finalContent,
      image: thumbnailUrl || formData.image?.[0]?.name || "",
      category: formData.category,
      tags: formData.tags,
    };

    try {
      const res = await createBlog(blogData);
      console.log(res);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        reset();
        setContent("");
        setTags([]);
        setIsOpen(false);
      }
    } catch (err: any) {
      console.error("Error creating blog:", err);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 dark:bg-white dark:text-black text-white rounded-none px-4 py-2"
      >
        Add Blog
      </button>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">Create New Blog Post</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    Blog title is required!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Content
                </label>
                <TextEditor content={content} setContent={setContent} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">
                    Blog image is required!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <textarea
                  placeholder="Enter tags separated by comma"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("tags", {
                    required: "Tags are required!",
                    onChange: (e) => {
                      const inputValues = e.target.value
                        .split(",")
                        .map((val: string) => val.trim())
                        .filter((val: string) => val !== "");
                      setTags(inputValues);
                    },
                  })}
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-600">
                    Blog tags are required!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("category", { required: true })}
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    Category is required!
                  </p>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 hover:bg-gray-800 text-white focus:outline-none"
                >
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBlogModal;
