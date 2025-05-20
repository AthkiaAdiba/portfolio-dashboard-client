import AddProjectModal from "@/components/myComponents/modals/AddProjectModal";
import ProjectTable from "@/components/myComponents/tables/ProjectTable";
import { getAllProject } from "@/services/ProjectService";

const DashboardProjectsPage = async () => {
  const projectData = await getAllProject();
  const projects = projectData?.data;

  return (
    <div className="lg:px-14 pb-10">
      <div className="flex justify-end mb-4">
        <AddProjectModal />
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
};

export default DashboardProjectsPage;
