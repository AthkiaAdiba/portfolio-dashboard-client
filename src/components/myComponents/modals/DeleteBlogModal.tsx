"use client";

import { deleteBlog } from "@/services/BlogService";
import { Blog } from "@/types/blog";
import { toast } from "sonner";

interface DeleteBlogModalProps {
  isDeleteBlogModalOpen: boolean;
  handleCloseDeleteModal: () => void;
  blog: Blog | null;
}

const DeleteBlogModal = ({
  isDeleteBlogModalOpen,
  handleCloseDeleteModal,
  blog,
}: DeleteBlogModalProps) => {
  if (!isDeleteBlogModalOpen || !blog) return null;

  const handleDeleteBlog = async (blogId: string) => {
    const toastId = toast.loading("Deleting Blog..", { duration: 2000 });

    try {
      const res = await deleteBlog(blogId);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        handleCloseDeleteModal();
      }
    } catch (error) {
      toast.error("An error occurred while deleting the project.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/60 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Delete Blog
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete the blog {blog.title}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCloseDeleteModal}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteBlog(blog._id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
