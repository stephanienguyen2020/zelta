import path from "path";
import fs from "fs/promises";
import { Profile } from "@/types/profile";
import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const uploadFile = async (file: Blob) => {
  const formData = new FormData();
  formData.append("file", file, `User information.txt`);
  formData.append("index_name", "user_info");

  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const setupAutoSave = async () => {
  try {
    const response = await fetch("/api/profile/read", {
      method: "GET",
    });

    const data = await response.json();

    if (data.success) {
      console.log("Profile files:", data.content);

      const fileBlob = new Blob([data.content], { type: "text/plain" });
      uploadFile(fileBlob);
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};
