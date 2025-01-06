import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Profile } from "@/types/profile";
import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const generateProfilePDF = (profile: Profile) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("Profile Information", 14, 15);

  // Basic Info
  autoTable(doc, {
    startY: 25,
    head: [["Basic Information"]],
    body: [
      ["Name", profile.name],
      ["Location", profile.location],
      ["Birthday", profile.birthday],
    ],
    theme: "striped",
  });

  // About
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["About Me"]],
    body: [
      ["Bio", profile.aboutMe],
      ["Life Goals", profile.lifeGoals],
    ],
    theme: "striped",
  });

  // Interests
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Interests"]],
    body: [[profile.interests.join(", ")]],
    theme: "striped",
  });

  // Preferences
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Preferences"]],
    body: [
      ["Communication Style", profile.communicationStyle],
      ["Love Language", profile.loveLanguage],
      ["Activity Level", profile.fitnessPreferences.activityLevel],
      ["Social Style", profile.socialPreferences.socialStyle],
    ],
    theme: "striped",
  });

  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `${profile.name
    .toLowerCase()
    .replace(/\s+/g, "-")}-profile-${timestamp}.pdf`;

  return doc.output("blob");
};

const uploadPDF = async (pdfBlob: Blob, profile: Profile) => {
  const formData = new FormData();
  formData.append("file", pdfBlob, `${profile.name}-profile.pdf`);
  formData.append("index_name", "user_info");

  const res = api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  console.log(res);
};

export const setupAutoSave = (profile: Profile) => {
  try {
    const pdfBlob = generateProfilePDF(profile);
    console.log("PDF Blob generated:", pdfBlob);
    uploadPDF(pdfBlob, profile);
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};
