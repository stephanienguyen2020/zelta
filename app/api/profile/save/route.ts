import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Profile } from '@/app/types/profile';

export async function POST(request: Request) {
  try {
    const profile: Profile = await request.json();
    
    // Convert profile to formatted string
    const profileString = JSON.stringify(profile, null, 2);
    
    // Create profiles directory in project root
    const rootDir = process.cwd();
    const profilesDir = path.join(rootDir, 'data', 'profiles');
    
    if (!fs.existsSync(profilesDir)) {
      fs.mkdirSync(profilesDir, { recursive: true });
    }

    // Clear the profiles directory
    const files = fs.readdirSync(profilesDir);
    if (files.length > 0) {
      // Delete all existing files in the directory
      files.forEach(file => {
        const filePath = path.join(profilesDir, file);
        fs.unlinkSync(filePath);
        console.log(`Removed file: ${file}`);
      });
    }

    // Save new profile with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `profile_${profile.name}_${timestamp}.txt`;
    const filePath = path.join(profilesDir, fileName);
    
    fs.writeFileSync(filePath, profileString);
    console.log(`Profile saved to ${filePath}`);
    
    return NextResponse.json({ success: true, filePath });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save profile' },
      { status: 500 }
    );
  }
} 