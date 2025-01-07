"use client";

import { Pencil, Save } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import GradientBackground from "@/app/components/GradientBackground";
import InteractiveBackground from "@/app/components/InteractiveBackground";
import Logo from "@/app/components/Logo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { toast } from "@/app/components/ui/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import { debounce } from "@/app/lib/debounce";
import { setupAutoSave } from "../lib/upload";
import { Profile } from "@/types/profile";

const availableInterests = [
  "Reading",
  "Music",
  "Movies",
  "Travel",
  "Food",
  "Art",
  "Sports",
  "Technology",
  "Nature",
  "Gaming",
  "Photography",
  "Cooking",
  "Writing",
  "Dancing",
  "Fitness",
];

const communicationStyles = [
  "Direct",
  "Casual",
  "Formal",
  "Playful",
  "Deep & Meaningful",
];
const loveLanguages = [
  "Words of Affirmation",
  "Quality Time",
  "Physical Touch",
  "Acts of Service",
  "Receiving Gifts",
];
const activityLevels = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
  "Extremely Active",
];
const socialStyles = ["Introvert", "Extrovert", "Ambivert"];
const learningStyles = ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"];
const workStyles = ["Remote", "Hybrid", "Office-based"];
const sleepSchedules = ["Night Owl", "Early Bird", "Flexible"];
const notificationFrequencies = [
  "Real-time",
  "Daily Digest",
  "Weekly Summary",
  "Important Only",
];
const privacyLevels = ["Public", "Friends Only", "Private"];
const chatStyles = ["Casual", "Professional", "Friendly", "Formal", "Playful"];
const availableCuisines = [
  "Italian",
  "Japanese",
  "Chinese",
  "Mexican",
  "Indian",
  "Thai",
  "French",
  "Mediterranean",
  "Korean",
  "Vietnamese",
  "American",
  "Greek",
  "Spanish",
  "Middle Eastern",
  "Brazilian",
];

// interface Profile {
//   name: string;
//   email: string;
//   birthday: string;
//   location: string;
//   aboutMe: string;
//   lifeGoals: string;
//   lookingFor: string;
//   communicationStyle: string;
//   loveLanguage: string;
//   interests: string[];
//   foodPreferences: {
//     favoriteCuisine: string;
//     dietaryRestrictions: string;
//     favoriteDishes: string;
//     foodsToAvoid: string;
//   };
//   drinkPreferences: {
//     favoriteBeverages: string;
//     specificPreferences: string;
//   };
//   entertainmentPreferences: {
//     favoriteMoviesShows: string;
//     favoriteGenres: string;
//     favoriteBooks: string;
//     preferredStreamingPlatforms: string;
//   };
//   musicPreferences: {
//     favoriteArtists: string;
//     favoriteGenres: string;
//     playlists: string;
//   };
//   fitnessPreferences: {
//     favoriteWorkouts: string;
//     activityLevel: string;
//     fitnessGoals: string;
//   };
//   sleepPreferences: {
//     usualBedtime: string;
//     morningOrEvening: string;
//   };
//   travelPreferences: {
//     favoriteDestinations: string;
//     travelGoals: string;
//     travelStyle: string;
//   };
//   learningPreferences: {
//     topicsOfInterest: string;
//     learningStyle: string;
//     currentlyLearning: string;
//   };
//   socialPreferences: {
//     preferredActivities: string;
//     socialStyle: string;
//     groupSize: string;
//   };
//   workPreferences: {
//     careerGoals: string;
//     workStyle: string;
//     skillsToLearn: string;
//   };
//   aiPreferences: {
//     chatStyle: string;
//     notificationFrequency: string;
//     topicsToAvoid: string;
//     privacySettings: string;
//   };
// }

// Add validation for form fields
const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case "email":
      return !value.includes("@") ? "Invalid email address" : null;
    case "name":
      return value.length < 2 ? "Name is too short" : null;
    default:
      return null;
  }
};

// Add back the useUnsavedChanges hook
const useUnsavedChanges = (initialProfile: Profile) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const checkChanges = useCallback(
    (currentProfile: Profile) => {
      const changed =
        JSON.stringify(currentProfile) !== JSON.stringify(initialProfile);
      setHasUnsavedChanges(changed);
    },
    [initialProfile]
  );

  return { hasUnsavedChanges, checkChanges };
};

// First, add a type for the section names
type SectionName =
  | "basic"
  | "about"
  | "interests"
  | "communication"
  | "lifestyle"
  | "learning"
  | "food"
  | "entertainment"
  | "travel"
  | "sleep"
  | "ai"
  | "privacy";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editingSections, setEditingSections] = useState<
    Record<SectionName, boolean>
  >({
    basic: false,
    about: false,
    interests: false,
    communication: false,
    lifestyle: false,
    learning: false,
    food: false,
    entertainment: false,
    travel: false,
    sleep: false,
    ai: false,
    privacy: false,
  });

  // Move profile state initialization before useUnsavedChanges
  const [profile, setProfile] = useState<Profile>({
    name: "Stephanie",
    email: "stephanie@example.com",
    birthday: "1995-06-15",
    location: "San Francisco, CA",
    aboutMe:
      "I'm an adventurous spirit who loves exploring new places and trying new things.",
    lifeGoals: "To travel to at least 30 countries and make a positive impact.",
    lookingFor: "A companion who can engage in meaningful conversations.",
    communicationStyle: "Deep & Meaningful",
    loveLanguage: "Words of Affirmation",
    interests: ["Music", "Travel", "Photography", "Cooking"],
    foodPreferences: {
      favoriteCuisine: "Italian, Japanese",
      dietaryRestrictions: "Vegetarian",
      favoriteDishes: "Pasta, Sushi",
      foodsToAvoid: "Spicy foods",
    },
    drinkPreferences: {
      favoriteBeverages: "Green tea, Craft coffee",
      specificPreferences: "No alcohol",
    },
    entertainmentPreferences: {
      favoriteMoviesShows: "Documentaries, Sci-fi series",
      favoriteGenres: "Mystery, Science Fiction",
      favoriteBooks: "Self-development, Fiction",
      preferredStreamingPlatforms: "Netflix, Prime Video",
    },
    musicPreferences: {
      favoriteArtists: "Various indie artists",
      favoriteGenres: "Indie pop, Classical",
      playlists: "Morning motivation, Focus music",
    },
    fitnessPreferences: {
      favoriteWorkouts: "Yoga, Running",
      activityLevel: "Moderately Active",
      fitnessGoals: "Maintain healthy lifestyle",
    },
    sleepPreferences: {
      usualBedtime: "10:30 PM",
      morningOrEvening: "Morning person",
    },
    travelPreferences: {
      favoriteDestinations: "Japan, Italy, New Zealand",
      travelGoals: "Visit every continent",
      travelStyle: "Cultural",
    },
    learningPreferences: {
      topicsOfInterest: "Languages, Psychology",
      learningStyle: "Visual",
      currentlyLearning: "Japanese language",
    },
    socialPreferences: {
      preferredActivities: "Small gatherings, Coffee meetups",
      socialStyle: "Ambivert",
      groupSize: "Small groups (3-5 people)",
    },
    workPreferences: {
      careerGoals: "Start own business",
      workStyle: "Remote with occasional meetings",
      skillsToLearn: "Digital marketing, Public speaking",
    },
    aiPreferences: {
      chatStyle: "Friendly",
      notificationFrequency: "Daily",
      topicsToAvoid: "Politics, Religion",
      privacySettings: "Share only necessary information",
    },
  });

  const userName = profile.name;

  // Add the useUnsavedChanges hook usage
  const { hasUnsavedChanges, checkChanges } = useUnsavedChanges(profile);

  // Move toggleInterest inside the component
  const toggleInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  // Update the handleSectionEdit function
  const handleSectionEdit = (section: SectionName) => {
    setEditingSections((prev) => ({
      ...prev,
      [section]: true,
    }));
  };

  const saveProfileToAPI = async (profileData: Profile) => {
    try {
      const response = await fetch("/api/profile/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Error saving profile:", error);
      return false;
    }
  };

  const debouncedSave = useCallback(
    debounce<Profile>(async (newProfile: Profile) => {
      console.log("Autosaving profile:", newProfile);
      toast({
        title: "Changes Saved",
        duration: 2000,
        className: "w-[180px]",
      });
      // Save to API in the background
      await saveProfileToAPI(newProfile);

      await setupAutoSave();

      setTimeout(() => {
        setEditingSections((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((key) => {
            newState[key as SectionName] = false;
          });
          return newState;
        });
      }, 500);
    }, 1500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error || "",
    }));

    const updatedProfile = { ...profile, [name]: value };
    setProfile(updatedProfile);
    checkChanges(updatedProfile);
    debouncedSave(updatedProfile);
  };

  // Update the SaveButton component
  const SaveButton = ({ section }: { section?: SectionName }) => (
    <Button
      onClick={() => handleSave(section)}
      variant="default"
      size="icon"
      className="h-8 w-8 bg-black hover:bg-gray-800"
      disabled={Object.keys(errors).length > 0}
    >
      <Save className="h-4 w-4 text-white" />
    </Button>
  );

  // Update the handleSave function to handle both global and section saves
  const handleSave = useCallback(
    async (section?: SectionName) => {
      if (section) {
        setEditingSections((prev) => ({
          ...prev,
          [section]: false,
        }));
        toast({
          title: "Changes Saved",
          duration: 2000,
          className: "w-[180px]",
        });
        // Save to API in the background
        await saveProfileToAPI(profile);
      } else {
        setEditingSections({
          basic: false,
          about: false,
          interests: false,
          communication: false,
          lifestyle: false,
          learning: false,
          food: false,
          entertainment: false,
          travel: false,
          sleep: false,
          ai: false,
          privacy: false,
        });
        setIsEditing(false);
        toast({
          title: "Changes Saved",
          duration: 2000,
          className: "w-[180px]",
        });
        // Save to API in the background
        await saveProfileToAPI(profile);
      }
    },
    [profile]
  );

  const handleSelectChange = (name: string) => (value: string) => {
    const keys = name.split(".");
    if (keys.length === 1) {
      setProfile((prev) => ({ ...prev, [name]: value }));
    } else {
      const [category, field] = keys;
      setProfile((prev) => {
        // Get the correct type for the category
        const categoryData = prev[category as keyof Profile];
        if (typeof categoryData === "object" && categoryData !== null) {
          return {
            ...prev,
            [category]: {
              ...categoryData,
              [field]: value,
            },
          };
        }
        return prev;
      });
    }
  };

  const toggleCuisine = (cuisine: string) => {
    setProfile((prev) => ({
      ...prev,
      foodPreferences: {
        ...prev.foodPreferences,
        favoriteCuisine: prev.foodPreferences.favoriteCuisine
          .split(", ")
          .filter((c) => c.length > 0)
          .includes(cuisine)
          ? prev.foodPreferences.favoriteCuisine
              .split(", ")
              .filter((c) => c !== cuisine)
              .join(", ")
          : prev.foodPreferences.favoriteCuisine
              .split(", ")
              .filter((c) => c.length > 0)
              .concat(cuisine)
              .join(", "),
      },
    }));
  };

  return (
    <InteractiveBackground>
      <GradientBackground>
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="flex items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-8">
              <Logo />
              <h1 className="text-2xl sm:text-3xl text-black">Your Profile</h1>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-md border-none shadow-lg">
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription className="text-black/60">
                          Your personal details
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.basic ? (
                          <SaveButton section="basic" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("basic")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Name
                        </label>
                        <Input
                          name="name"
                          disabled={!editingSections.basic}
                          value={profile.name}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Birthday
                        </label>
                        <Input
                          name="birthday"
                          type="date"
                          disabled={!editingSections.basic}
                          value={profile.birthday}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Location
                        </label>
                        <Input
                          name="location"
                          disabled={!editingSections.basic}
                          value={profile.location}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Your location"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* About Me */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>About Me</CardTitle>
                        <CardDescription className="text-black/60">
                          Tell us about yourself
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.about ? (
                          <SaveButton section="about" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("about")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Bio
                        </label>
                        <Textarea
                          name="aboutMe"
                          disabled={!editingSections.about}
                          value={profile.aboutMe}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100 min-h-[100px]"
                          placeholder="Share something about yourself"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Life Goals
                        </label>
                        <Textarea
                          name="lifeGoals"
                          disabled={!editingSections.about}
                          value={profile.lifeGoals}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What are your life goals?"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interests */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Interests</CardTitle>
                        <CardDescription className="text-black/60">
                          Select your interests
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.interests ? (
                          <SaveButton section="interests" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("interests")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {availableInterests.map((interest) => (
                          <Badge
                            key={interest}
                            variant="secondary"
                            className={`
                              cursor-pointer transition-all duration-200 border
                              ${
                                profile.interests.includes(interest)
                                  ? "bg-black text-white hover:bg-gray-800 border-black"
                                  : "bg-white/10 text-gray-600 hover:bg-white/20 border-black/50"
                              }
                              ${!editingSections.interests && "cursor-default"}
                            `}
                            onClick={() =>
                              editingSections.interests &&
                              toggleInterest(interest)
                            }
                          >
                            {interest}
                            {editingSections.interests &&
                              profile.interests.includes(interest) && (
                                <span className="ml-1">✓</span>
                              )}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Communication Preferences */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Communication Preferences</CardTitle>
                        <CardDescription className="text-black/60">
                          How you prefer to interact
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.communication ? (
                          <SaveButton section="communication" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("communication")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Communication Style
                        </label>
                        <Select
                          disabled={!editingSections.communication}
                          value={profile.communicationStyle}
                          onValueChange={handleSelectChange(
                            "communicationStyle"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your communication style" />
                          </SelectTrigger>
                          <SelectContent>
                            {communicationStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Love Language
                        </label>
                        <Select
                          disabled={!editingSections.communication}
                          value={profile.loveLanguage}
                          onValueChange={handleSelectChange("loveLanguage")}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your love language" />
                          </SelectTrigger>
                          <SelectContent>
                            {loveLanguages.map((language) => (
                              <SelectItem key={language} value={language}>
                                {language}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lifestyle Preferences */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader>
                      <CardTitle>Lifestyle</CardTitle>
                      <CardDescription className="text-black/60">
                        Your daily routines and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Activity Level
                        </label>
                        <Select
                          disabled={!editingSections.lifestyle}
                          value={profile.fitnessPreferences.activityLevel}
                          onValueChange={handleSelectChange(
                            "fitnessPreferences.activityLevel"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            {activityLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Social Style
                        </label>
                        <Select
                          disabled={!editingSections.lifestyle}
                          value={profile.socialPreferences.socialStyle}
                          onValueChange={handleSelectChange(
                            "socialPreferences.socialStyle"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your social style" />
                          </SelectTrigger>
                          <SelectContent>
                            {socialStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning & Work */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader>
                      <CardTitle>Learning & Work</CardTitle>
                      <CardDescription className="text-black/60">
                        Your professional and educational preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Learning Style
                        </label>
                        <Select
                          disabled={!editingSections.learning}
                          value={profile.learningPreferences.learningStyle}
                          onValueChange={handleSelectChange(
                            "learningPreferences.learningStyle"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your learning style" />
                          </SelectTrigger>
                          <SelectContent>
                            {learningStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Work Style
                        </label>
                        <Select
                          disabled={!editingSections.learning}
                          value={profile.workPreferences.workStyle}
                          onValueChange={handleSelectChange(
                            "workPreferences.workStyle"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your work style" />
                          </SelectTrigger>
                          <SelectContent>
                            {workStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Food & Drink Preferences */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Food & Drink</CardTitle>
                        <CardDescription className="text-black/60">
                          Your culinary preferences
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.food ? (
                          <SaveButton section="food" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("food")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Favorite Cuisines
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {availableCuisines.map((cuisine) => {
                            const selectedCuisines =
                              profile.foodPreferences.favoriteCuisine
                                .split(", ")
                                .filter((c) => c.length > 0);

                            return (
                              <Badge
                                key={cuisine}
                                variant="secondary"
                                className={`
                                  cursor-pointer transition-all duration-200 border
                                  ${
                                    selectedCuisines.includes(cuisine)
                                      ? "bg-black text-white hover:bg-gray-800 border-black"
                                      : "bg-white/10 text-gray-600 hover:bg-white/20 border-black/50"
                                  }
                                  ${!editingSections.food && "cursor-default"}
                                `}
                                onClick={() =>
                                  editingSections.food && toggleCuisine(cuisine)
                                }
                              >
                                {cuisine}
                                {editingSections.food &&
                                  selectedCuisines.includes(cuisine) && (
                                    <span className="ml-1">✓</span>
                                  )}
                              </Badge>
                            );
                          })}
                        </div>
                        {editingSections.food && (
                          <p className="text-black/60 text-sm mt-2">
                            Click to select/deselect cuisines
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Dietary Restrictions
                        </label>
                        <Input
                          name="foodPreferences.dietaryRestrictions"
                          disabled={!editingSections.food}
                          value={profile.foodPreferences.dietaryRestrictions}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Favorite Beverages
                        </label>
                        <Input
                          name="drinkPreferences.favoriteBeverages"
                          disabled={!editingSections.food}
                          value={profile.drinkPreferences.favoriteBeverages}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What do you like to drink?"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Entertainment Preferences */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Entertainment</CardTitle>
                        <CardDescription className="text-black/60">
                          Your entertainment preferences
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.entertainment ? (
                          <SaveButton section="entertainment" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("entertainment")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Favorite Movies & Shows
                        </label>
                        <Textarea
                          name="entertainmentPreferences.favoriteMoviesShows"
                          disabled={!editingSections.entertainment}
                          value={
                            profile.entertainmentPreferences.favoriteMoviesShows
                          }
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What do you like to watch?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Favorite Books
                        </label>
                        <Textarea
                          name="entertainmentPreferences.favoriteBooks"
                          disabled={!editingSections.entertainment}
                          value={profile.entertainmentPreferences.favoriteBooks}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What do you like to read?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Music Preferences
                        </label>
                        <Textarea
                          name="musicPreferences.favoriteGenres"
                          disabled={!editingSections.entertainment}
                          value={profile.musicPreferences.favoriteGenres}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What music do you enjoy?"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Travel Preferences */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Travel</CardTitle>
                        <CardDescription className="text-black/60">
                          Your travel preferences and aspirations
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.travel ? (
                          <SaveButton section="travel" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("travel")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Favorite Destinations
                        </label>
                        <Textarea
                          name="travelPreferences.favoriteDestinations"
                          disabled={!editingSections.travel}
                          value={profile.travelPreferences.favoriteDestinations}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Where have you enjoyed traveling?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Travel Goals
                        </label>
                        <Textarea
                          name="travelPreferences.travelGoals"
                          disabled={!editingSections.travel}
                          value={profile.travelPreferences.travelGoals}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Where would you like to go?"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sleep Preferences */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Sleep & Daily Routine</CardTitle>
                        <CardDescription className="text-black/60">
                          Your sleep and daily schedule preferences
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.sleep ? (
                          <SaveButton section="sleep" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("sleep")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Sleep Schedule
                        </label>
                        <Select
                          disabled={!editingSections.sleep}
                          value={profile.sleepPreferences.morningOrEvening}
                          onValueChange={handleSelectChange(
                            "sleepPreferences.morningOrEvening"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select your sleep schedule" />
                          </SelectTrigger>
                          <SelectContent>
                            {sleepSchedules.map((schedule) => (
                              <SelectItem key={schedule} value={schedule}>
                                {schedule}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Usual Bedtime
                        </label>
                        <Input
                          type="time"
                          name="sleepPreferences.usualBedtime"
                          disabled={!editingSections.sleep}
                          value={profile.sleepPreferences.usualBedtime}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Interaction Preferences */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>AI Interaction</CardTitle>
                        <CardDescription className="text-black/60">
                          How you prefer to interact with your AI companion
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.ai ? (
                          <SaveButton section="ai" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("ai")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Chat Style
                        </label>
                        <Select
                          disabled={!editingSections.ai}
                          value={profile.aiPreferences.chatStyle}
                          onValueChange={handleSelectChange(
                            "aiPreferences.chatStyle"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select preferred chat style" />
                          </SelectTrigger>
                          <SelectContent>
                            {chatStyles.map((style) => (
                              <SelectItem key={style} value={style}>
                                {style}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Notification Frequency
                        </label>
                        <Select
                          disabled={!editingSections.ai}
                          value={profile.aiPreferences.notificationFrequency}
                          onValueChange={handleSelectChange(
                            "aiPreferences.notificationFrequency"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select notification frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {notificationFrequencies.map((freq) => (
                              <SelectItem key={freq} value={freq}>
                                {freq}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Topics to Avoid
                        </label>
                        <Textarea
                          name="aiPreferences.topicsToAvoid"
                          disabled={!editingSections.ai}
                          value={profile.aiPreferences.topicsToAvoid}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Topics you'd prefer not to discuss"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Privacy Settings */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Privacy Settings</CardTitle>
                        <CardDescription className="text-black/60">
                          Control your data and privacy preferences
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {editingSections.privacy ? (
                          <SaveButton section="privacy" />
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSectionEdit("privacy")}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Privacy Level
                        </label>
                        <Select
                          disabled={!editingSections.privacy}
                          value={profile.aiPreferences.privacySettings}
                          onValueChange={handleSelectChange(
                            "aiPreferences.privacySettings"
                          )}
                        >
                          <SelectTrigger className="bg-white/20 text-black disabled:text-black disabled:opacity-100">
                            <SelectValue placeholder="Select privacy level" />
                          </SelectTrigger>
                          <SelectContent>
                            {privacyLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">
                          Data Sharing Preferences
                        </label>
                        <Textarea
                          name="aiPreferences.privacySettings"
                          disabled={!editingSections.privacy}
                          value={profile.aiPreferences.privacySettings}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Specify your data sharing preferences"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <SaveButton section="basic" />
              </div>
            )}
          </div>
        </div>
      </GradientBackground>
    </InteractiveBackground>
  );
}
