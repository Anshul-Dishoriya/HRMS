import { useState } from "react";
import toast from "react-hot-toast";

export const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);

  const execute = async (...args) => {
    try {
      setLoading(true);

      const response = await apiFunction(...args);

      if (response?.message) {
        toast.success(response.message);
      }

      return response;
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
};
