import axios from "axios";

const API = "http://localhost:5000/api/media";

export const getMedia = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const uploadMedia = async (formData: FormData) => {
  const res = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};