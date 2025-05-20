import React from "react";
import { FiTag, FiCalendar, FiFolder } from "react-icons/fi";

interface BlogDetailsProps {
  blog: {
    title: string;
    content: string;
    image: string;
    category: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  };
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blogs }) => {
  // Format date without date-fns
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!blogs) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-[500px] bg-gray-200 rounded-xl mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {blogs?.map((blog: any) => (
        <article
          key={blog?._id}
          className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-lg rounded-lg"
        >
          {/* Blog Header */}
          <header className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {blog?.title || "No Title Available"}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-blue-600" />
                  <span>
                    {blog?.createdAt
                      ? formatDate(blog.createdAt)
                      : "No Date Available"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiFolder className="text-blue-600" />
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    {blog?.category || "Uncategorized"}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[500px] mb-8 overflow-hidden rounded-xl shadow-md">
              <img
                src={blog?.image || "/placeholder-image.jpg"}
                alt={blog?.title || "Blog Image"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </header>

          {/* Blog Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={
              blog?.content
                ? { __html: blog.content }
                : { __html: "<p>No content available</p>" }
            }
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <FiTag className="text-blue-600 text-xl" />
              <div className="flex flex-wrap gap-2">
                {blog?.tags?.length > 0 ? (
                  blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No tags available</span>
                )}
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">A</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Admin</h3>
                <p className="text-sm text-gray-600">Content Writer</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogDetails;
