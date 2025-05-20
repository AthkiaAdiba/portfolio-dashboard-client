/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { TFetchedProject } from "@/types/project";
import { deleteProject } from "@/services/ProjectService";

interface DeleteProjectModalProps {
  isDeleteProjectModal: boolean;
  handleCloseProjectDeleteModal: () => void;
  project: TFetchedProject | null;
}

const DeleteProjectModal = ({
  isDeleteProjectModal,
  handleCloseProjectDeleteModal,
  project,
}: DeleteProjectModalProps) => {
  if (!isDeleteProjectModal) return null;

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting Project...", { duration: 2000 });

    try {
      const res = await deleteProject(project?._id as string);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        handleCloseProjectDeleteModal();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/60 dark:bg-black/70 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Delete Project
          </h2>
          <button
            onClick={handleCloseProjectDeleteModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete the project {project?.projectName}?
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCloseProjectDeleteModal}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
