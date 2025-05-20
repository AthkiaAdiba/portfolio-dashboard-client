"use client";

import { deleteSkill } from "@/services/SkillService";
import { TFetchedSkill } from "@/types/skill";
import { toast } from "sonner";

interface DeleteSkillModalProps {
  isDeleteSkillModalOpen: boolean;
  handleCloseSkillDeleteModal: () => void;
  skill: TFetchedSkill | null;
}

const DeleteSkillModal = ({
  isDeleteSkillModalOpen,
  handleCloseSkillDeleteModal,
  skill,
}: DeleteSkillModalProps) => {
  if (!isDeleteSkillModalOpen || !skill) return null;

  const handleDeleteSkill = async (skillId: string) => {
    const toastId = toast.loading("Deleting Skill..", { duration: 2000 });

    try {
      const res = await deleteSkill(skillId);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        handleCloseSkillDeleteModal();
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
          Delete Skill
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete the blog {skill.name}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCloseSkillDeleteModal}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteSkill(skill._id)}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSkillModal;
