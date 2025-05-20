import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athkia Adiba Tonne | Messages",
  description:
    "Athkia Adiba Tonne – a passionate Full-Stack developer specializing in Next.js, TypeScript, Node.js, Express, MongoDB, Mongoose, and Redux. Crafting dynamic and scalable web applications with a focus on performance and user experience.",
};

const DashboardEmailsPage = async () => {
  // const emailsData = await getAllEmails();
  // const emails = emailsData?.data;

  return (
    <div>
      <h1 className="text-4xl font-bold pb-10 text-center">All Emails</h1>
      {/* <EmailTable emails={emails} /> */}
    </div>
  );
};

export default DashboardEmailsPage;
