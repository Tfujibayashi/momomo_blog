export type SaveContentRequestBody = {
  id: string;
  title: string;
  text: string;
  isPublic: boolean;
};

export type AddContentRequestBody = {
  id: string;
  title: string;
  text: string;
  // imagePath: string;
};
