import fs from "fs";
import path from "path";
import { Profile } from "@/app/types/profile";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export const saveProfileToFile = async (profile: Profile) => {
  try {
    // Convert profile to formatted string
    const profileString = JSON.stringify(profile, null, 2);
    const profilePDFBlob = generateProfilePDF(profile);

    // Create profiles directory if it doesn't exist
    const profilesDir = path.join(process.cwd(), "data", "profiles");
    if (!fs.existsSync(profilesDir)) {
      fs.mkdirSync(profilesDir, { recursive: true });
    }

    // Save profile with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `profile_${profile.name}_${timestamp}.txt`;
    const filePath = path.join(profilesDir, fileName);

    fs.writeFileSync(filePath, profileString);
    console.log(`Profile saved to ${filePath}`);

    // Convert Blob to Buffer
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(Buffer.from(arrayBuffer));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(profilePDFBlob); // Read the Blob as ArrayBuffer
    });

    // Save the PDF file
    const pdfFileName = `${profile.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-profile-${timestamp}.pdf`;
    const pdfFilePath = path.join(profilesDir, pdfFileName);
    fs.writeFileSync(pdfFilePath, pdfBuffer); // Save PDF
    console.log(`Profile PDF saved to ${pdfFilePath}`);

    return true;
  } catch (error) {
    console.error("Error saving profile:", error);
    return false;
  }
};
