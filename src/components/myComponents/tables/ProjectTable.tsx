"use client";

import { TFetchedProject } from "@/types/project";
import Image from "next/image";
import EditProjectModal from "../modals/EditProjectModal";
import { useState } from "react";
import DeleteProjectModal from "../modals/DeleteProjectModal";

const ProjectTable = ({ projects }: { projects: TFetchedProject[] }) => {
  const [isUpdateProjectModal, setIsUpdateProjectModal] = useState(false);
  const [editProject, setEditProject] = useState<TFetchedProject | null>(null);
  const [isDeleteProjectModal, setIsDeleteProjectModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState<TFetchedProject | null>(
    null
  );

  const handleEditProject = (project: TFetchedProject) => {
    setEditProject(project);
    setIsUpdateProjectModal(true);
  };

  const handleCloseProjectUpdateModal = () => {
    setIsUpdateProjectModal(false);
    setEditProject(null);
  };

  const handleOpenProjectDeleteModal = (project: TFetchedProject) => {
    setDeleteProject(project);
    setIsDeleteProjectModal(true);
  };

  const handleCloseProjectDeleteModal = () => {
    setDeleteProject(null);
    setIsDeleteProjectModal(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left">THUMBNAIL</th>
            <th className="px-4 py-2 text-left">PROJECT NAME</th>
            <th className="px-4 py-2 text-left">DESCRIPTION</th>
            <th className="px-4 py-2 text-left">POSTED DATE</th>
            <th className="px-4 py-2 text-left">UPDATED DATE</th>
            <th className="px-4 py-2 text-left">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {projects?.map((project: TFetchedProject) => (
            <tr key={project._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">
                <Image
                  height={100}
                  width={100}
                  src={project?.image[0]}
                  alt="Thumbnail"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{project.projectName}</td>
              <td className="px-4 py-2">
                {project?.projectDescription.slice(0, 100) + "..."}
              </td>
              <td className="px-4 py-2">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {new Date(project.updatedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 flex space-x-2">
                {/* Edit Icon */}
                <button
                  onClick={() => handleEditProject(project)}
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
                  onClick={() => handleOpenProjectDeleteModal(project)}
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
      <EditProjectModal
        isUpdateProjectModal={isUpdateProjectModal}
        editProject={editProject}
        handleCloseProjectUpdateModal={handleCloseProjectUpdateModal}
      />
      <DeleteProjectModal
        isDeleteProjectModal={isDeleteProjectModal}
        handleCloseProjectDeleteModal={handleCloseProjectDeleteModal}
        project={deleteProject}
      />
    </div>
  );
};

export default ProjectTable;
