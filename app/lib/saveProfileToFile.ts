import fs from 'fs';
import path from 'path';
import { Profile } from '@/app/types/profile';

export const saveProfileToFile = async (profile: Profile) => {
  try {
    // Convert profile to formatted string
    const profileString = JSON.stringify(profile, null, 2);
    
    // Create profiles directory if it doesn't exist
    const profilesDir = path.join(process.cwd(), 'data', 'profiles');
    if (!fs.existsSync(profilesDir)) {
      fs.mkdirSync(profilesDir, { recursive: true });
    }

    // Save profile with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `profile_${profile.name}_${timestamp}.txt`;
    const filePath = path.join(profilesDir, fileName);
    
    fs.writeFileSync(filePath, profileString);
    console.log(`Profile saved to ${filePath}`);
    
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    return false;
  }
}; 