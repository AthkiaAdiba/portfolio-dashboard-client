"use client";

import { Blog } from "@/types/blog";
import Image from "next/image";
import { useState } from "react";
import EditBlogModal from "@/components/myComponents/modals/EditBlogModal";
import DeleteBlogModal from "@/components/myComponents/modals/DeleteBlogModal";

const BlogTable = ({ blogs }: { blogs: Blog[] }) => {
  const [isUpdateBlogModalOpen, setIsUpdateBlogModalOpen] = useState(false);
  const [isDeleteBlogModalOpen, setIsDeleteBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);

  const handleEditClick = (blog: Blog) => {
    setEditingBlog(blog);
    setIsUpdateBlogModalOpen(true);
  };

  const handleDeleteClick = (blog: Blog) => {
    setDeletingBlog(blog);
    setIsDeleteBlogModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsUpdateBlogModalOpen(false);
    setEditingBlog(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteBlogModalOpen(false);
    setDeletingBlog(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left">THUMBNAIL</th>
            <th className="px-4 py-2 text-left">TITLE</th>
            <th className="px-4 py-2 text-left">CONTENT</th>
            <th className="px-4 py-2 text-left">POSTED DATE</th>
            <th className="px-4 py-2 text-left">UPDATED DATE</th>
            <th className="px-4 py-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog: Blog) => (
            <tr key={blog._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">
                <Image
                  height={100}
                  width={100}
                  src={blog.image}
                  alt="Thumbnail"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{blog.title}</td>
              <td className="px-4 py-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content?.substring(0, 100) + "...",
                  }}
                />
              </td>
              <td className="px-4 py-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(blog.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                {/* Edit Icon */}
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(blog)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                {/* Delete Icon */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(blog)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBlogModal
        isUpdateBlogModalOpen={isUpdateBlogModalOpen}
        onClose={handleCloseModal}
        blog={editingBlog}
      />
      <DeleteBlogModal
        isDeleteBlogModalOpen={isDeleteBlogModalOpen}
        handleCloseDeleteModal={handleCloseDeleteModal}
        blog={deletingBlog}
      />
    </div>
  );
};

export default BlogTable;
