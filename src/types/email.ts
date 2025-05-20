export type TEmail = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type TFetchedEmail = {
  name: string;
  email: string;
  subject: string;
  message: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
