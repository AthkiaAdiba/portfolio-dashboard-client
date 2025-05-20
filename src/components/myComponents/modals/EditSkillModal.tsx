/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TFetchedSkill } from "@/types/skill";
import { updateSkill } from "@/services/SkillService";

interface EditSkillModalProps {
  isUpdateSkillModalOpen: boolean;
  handleCloseSkillUpdateModal: () => void;
  skill: TFetchedSkill | null;
}

const EditSkillModal = ({
  isUpdateSkillModalOpen,
  skill,
  handleCloseSkillUpdateModal,
}: EditSkillModalProps) => {
  const defaultValues = {
    name: skill?.name,
    iconName: skill?.iconName,
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  // Add useEffect to update form when editProject changes
  useEffect(() => {
    if (skill) {
      reset({
        name: skill?.name,
        iconName: skill?.iconName,
      });
    }
  }, [skill, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Updating Skill", { duration: 2000 });

    try {
      // Prepare data for the backend
      const SkillData = {
        data: {
          name: formData.name,
          iconName: formData.iconName,
        },
        skillId: skill?._id,
      };

      const res = await updateSkill(SkillData);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        reset();
        handleCloseSkillUpdateModal();
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  if (!isUpdateSkillModalOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/60 dark:bg-black/70 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Skill
          </h2>
          <button
            onClick={handleCloseSkillUpdateModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* field 1 */}
            <div>
              <Label
                htmlFor="name"
                className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
              >
                Skill Name:
              </Label>
              <Input
                id="name"
                type="text"
                className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                {...register("name")}
              />
            </div>

            {/* field 7 */}
            <div>
              <Label
                htmlFor="liveLink"
                className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
              >
                Icon Name:
              </Label>
              <Input
                id="iconName"
                type="text"
                className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                {...register("iconName")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Update Skill
            </button>
            <button
              type="button"
              onClick={handleCloseSkillUpdateModal}
              className="inline-block align-baseline font-bold text-sm text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkillModal;
