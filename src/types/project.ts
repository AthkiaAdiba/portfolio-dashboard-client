export type TProject = {
  projectName: string;
  image: string[];
  projectDescription: string;
  features: string[];
  technologies: string;
  liveLink: string;
  serverCodeLink: string;
  clientCodeLink: string;
};

export type TFetchedProject = {
  projectName: string;
  image: string[];
  projectDescription: string;
  features: string[];
  technologies: string;
  liveLink: string;
  serverCodeLink: string;
  clientCodeLink: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};
