"use client";

import { TFetchedSkill } from "@/types/skill";
import { useState } from "react";
import EditSkillModal from "../modals/EditSkillModal";
import DeleteSkillModal from "../modals/DeleteSkillModal";

const SkillTable = ({ skills }: { skills: TFetchedSkill[] }) => {
  const [isUpdateSkillModalOpen, setIsUpdateSkillModalOpen] = useState(false);
  const [skill, setSkill] = useState<TFetchedSkill | null>(null);
  const [isDeleteSkillModalOpen, setIsDeleteSkillModalOpen] = useState(false);

  const handleEditSkill = (skill: TFetchedSkill) => {
    setSkill(skill);
    setIsUpdateSkillModalOpen(true);
  };

  const handleCloseSkillUpdateModal = () => {
    setIsUpdateSkillModalOpen(false);
    setSkill(null);
  };

  const handleOpenSkillDeleteModal = (skill: TFetchedSkill) => {
    setSkill(skill);
    setIsDeleteSkillModalOpen(true);
  };

  const handleCloseSkillDeleteModal = () => {
    setSkill(null);
    setIsDeleteSkillModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left">Skill Name</th>
            <th className="px-4 py-2 text-left">Icon Name</th>
            <th className="px-4 py-2 text-left">POSTED DATE</th>
            <th className="px-4 py-2 text-left">UPDATED DATE</th>
            <th className="px-4 py-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {skills?.map((skill: TFetchedSkill) => (
            <tr key={skill._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{skill.name}</td>
              <td className="px-4 py-2">{skill?.iconName}</td>
              <td className="px-4 py-2">
                {new Date(skill.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(skill.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                {/* Edit Icon */}
                <button
                  onClick={() => handleEditSkill(skill)}
                  className="text-blue-500 hover:text-blue-700"
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
                  onClick={() => handleOpenSkillDeleteModal(skill)}
                  className="text-red-500 hover:text-red-700"
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
      <EditSkillModal
        isUpdateSkillModalOpen={isUpdateSkillModalOpen}
        skill={skill}
        handleCloseSkillUpdateModal={handleCloseSkillUpdateModal}
      />
      <DeleteSkillModal
        isDeleteSkillModalOpen={isDeleteSkillModalOpen}
        handleCloseSkillDeleteModal={handleCloseSkillDeleteModal}
        skill={skill}
      />
    </div>
  );
};

export default SkillTable;
