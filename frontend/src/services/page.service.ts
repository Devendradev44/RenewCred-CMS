import api from "./api";

export interface Page {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  updatedAt: string;
}

export const getPages = async (): Promise<Page[]> => {
  const response = await api.get("/pages");
  return response.data;
};

export const getPageById = async (id: string) => {
  const response = await api.get(`/pages/${id}`);
  return response.data;
};

export const createPage = async (data: any) => {
  const response = await api.post("/pages", data);
  return response.data;
};

export const updatePage = async (id: string, data: any) => {
  const response = await api.put(`/pages/${id}`, data);
  return response.data;
};

export const deletePage = async (id: string) => {
  const response = await api.delete(`/pages/${id}`);
  return response.data;
};