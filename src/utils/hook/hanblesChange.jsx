import { useState } from "react";

export const HanblesChange = (initialForm = {}) => {
  const [form, setForm] = useState(initialForm);

  const hanbleChangeText = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const hanbleChangeNum = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ""); // solo números
    setForm((prev) => ({ ...prev, [name]: numericValue }));
  };

  return {
    form,
    setForm,
    hanbleChangeText,
    hanbleChangeNum,
  };
};
