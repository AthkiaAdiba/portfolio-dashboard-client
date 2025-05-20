import AddSkillModal from "@/components/myComponents/modals/AddSkillModal";
import SkillTable from "@/components/myComponents/tables/SkillTable";
import { getAllSkills } from "@/services/SkillService";

const DashboardSkillsPage = async () => {
  const skillsData = await getAllSkills();
  const skills = skillsData?.data;

  return (
    <div className="lg:px-14 pb-10">
      <div className="flex justify-end mb-4">
        <AddSkillModal />
      </div>
      <SkillTable skills={skills} />
    </div>
  );
};

export default DashboardSkillsPage;
