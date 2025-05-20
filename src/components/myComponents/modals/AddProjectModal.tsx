/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createProject } from "@/services/ProjectService";

const AddProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureValues, setFeatureValues] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const upload_preset = "stationary_shop";
  const cloud_name = "dv6fgvj2c";

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const toastId = toast.loading("Adding Project", { duration: 2000 });

    if (images.length === 0) {
      toast.error("At least one project image is required!", { id: toastId });
      return;
    }

    formData.features = featureValues;
    formData.images = images;

    const uploadedImages = await Promise.all(
      formData.images.map(async (imageFile: File) => {
        const imageData = new FormData();
        imageData.append("file", imageFile);
        imageData.append("upload_preset", upload_preset);
        imageData.append("cloud_name", cloud_name);

        const imageUploadResult = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadedImage = await imageUploadResult.json();
        return uploadedImage.url;
      })
    );

    // Prepare data for the backend
    const projectData = {
      projectName: formData.name,
      image: uploadedImages,
      projectDescription: formData.description,
      features: featureValues,
      technologies: formData.technologies,
      liveLink: formData.liveLink,
      serverCodeLink: formData.serverCodeLink,
      clientCodeLink: formData.clientCodeLink,
    };

    try {
      const res = await createProject(projectData);

      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else if (res.success) {
        toast.success(res?.message, { id: toastId });
        reset();
        setImages([]);
        setFeatureValues([]);
        setIsOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
      >
        Add New Project
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/60 dark:bg-black/70 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add New Project
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 py-4">
                {/* field 1 */}
                <div>
                  <Label
                    htmlFor="name"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Project Name:
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500">Project Name is required!</p>
                  )}
                </div>

                {/* field 7 */}
                <div>
                  <Label
                    htmlFor="liveLink"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Live Link:
                  </Label>
                  <Input
                    id="liveLink"
                    type="text"
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    {...register("liveLink", { required: true })}
                  />
                  {errors.liveLink && (
                    <p className="text-red-500">Live link is required!</p>
                  )}
                </div>

                {/* field 8 */}
                <div>
                  <Label
                    htmlFor="serverCodeLink"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Server Code Link:
                  </Label>
                  <Input
                    id="serverCodeLink"
                    type="text"
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    {...register("serverCodeLink", { required: true })}
                  />
                  {errors.serverCodeLink && (
                    <p className="text-red-500">
                      Server Code Link is required!
                    </p>
                  )}
                </div>

                {/* field 9 */}
                <div>
                  <Label
                    htmlFor="clientCodeLink"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Client Code Link:
                  </Label>
                  <Input
                    id="clientCodeLink"
                    type="text"
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    {...register("clientCodeLink", { required: true })}
                  />
                  {errors.clientCodeLink && (
                    <p className="text-red-500">
                      Client Code Link is required!
                    </p>
                  )}
                </div>

                {/* field 6 */}
                <div>
                  <Label
                    htmlFor="technologies"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Technologies:
                  </Label>
                  <Textarea
                    id="technologies"
                    placeholder="Enter technologies"
                    rows={2}
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    {...register("technologies", {
                      required: true,
                    })}
                  />
                  {errors.technologies && (
                    <p className="text-red-500">Technologies are required!</p>
                  )}
                </div>

                {/* field 5 */}
                <div>
                  <Label
                    htmlFor="file"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Project Image:
                  </Label>
                  <Input
                    accept="image/*"
                    multiple
                    required
                    type="file"
                    id="file"
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files) {
                        setImages((prevImages) => [
                          ...prevImages,
                          ...Array.from(files),
                        ]);
                      }
                    }}
                  />
                </div>

                {/* Full width fields */}
                <div className="col-span-2">
                  <Label
                    htmlFor="description"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Description:
                  </Label>
                  <Textarea
                    rows={6}
                    placeholder="Write Project description"
                    className="dark:bg-gray-700 dark:text-gray-300"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <p className="text-red-500">
                      Project description is required!
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <Label
                    htmlFor="brand"
                    className="font-semibold text-gray-700 dark:text-gray-300 mb-2 block"
                  >
                    Features:
                  </Label>
                  <Textarea
                    id="features"
                    placeholder="Enter features separated by fullstop"
                    rows={3}
                    className="col-span-3 dark:bg-gray-700 dark:text-gray-300"
                    {...register("features", {
                      required: "Features are required!",
                      onChange: (e) => {
                        const inputValues = e.target.value
                          .split(".")
                          .map((val: string) => val.trim())
                          .filter((val: string) => val !== "");
                        setFeatureValues(inputValues);
                      },
                    })}
                  />
                  {errors.features && (
                    <p className="text-red-500">
                      Project features are required!
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  Add Project
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-block align-baseline font-bold text-sm text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;
