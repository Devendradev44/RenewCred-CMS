import api from "@/lib/axios";

export const getMedia = async () => {
  const res = await api.get("/media");
  return res.data;
};

export const uploadMedia = async (formData: FormData) => {
  const res = await api.post("/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};