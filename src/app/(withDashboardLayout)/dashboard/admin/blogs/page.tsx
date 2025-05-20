import AddBlogModal from "@/components/myComponents/modals/AddBlogModal";
import BlogTable from "@/components/myComponents/tables/BlogTable";
import { getAllBlogs } from "@/services/BlogService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athkia Adiba Tonne | Blogs",
  description:
    "Read insightful blogs by Athkia Adiba Tonne on web development, Next.js, TypeScript, Node.js, Express, MongoDB, Mongoose, Redux, and more. Stay updated with coding tips, best practices, and industry trends.",
};

const DashboardBlogsPage = async () => {
  const blogData = await getAllBlogs();
  const blogs = blogData?.data;

  return (
    <div className="lg:px-14 pb-10">
      <div className="flex justify-end mb-4">
        <AddBlogModal />
      </div>
      <BlogTable blogs={blogs} />
    </div>
  );
};

export default DashboardBlogsPage;
