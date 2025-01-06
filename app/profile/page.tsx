"use client";

import { Pencil, Save, X } from "lucide-react";
import { useState, useCallback } from 'react';
import GradientBackground from "@/app/components/GradientBackground";
import InteractiveBackground from "@/app/components/InteractiveBackground";
import Logo from "@/app/components/Logo";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { toast } from "@/app/components/ui/use-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/components/ui/select";

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
  "Fitness"
];

const communicationStyles = ["Direct", "Casual", "Formal", "Playful", "Deep & Meaningful"];
const loveLanguages = ["Words of Affirmation", "Quality Time", "Physical Touch", "Acts of Service", "Receiving Gifts"];
const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"];
const socialStyles = ["Introvert", "Extrovert", "Ambivert"];
const learningStyles = ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"];
const workStyles = ["Remote", "Hybrid", "Office-based"];
const sleepSchedules = ["Night Owl", "Early Bird", "Flexible"];
const notificationFrequencies = ["Real-time", "Daily Digest", "Weekly Summary", "Important Only"];
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
  "Brazilian"
];

interface Profile {
  name: string;
  email: string;
  birthday: string;
  location: string;
  aboutMe: string;
  lifeGoals: string;
  lookingFor: string;
  communicationStyle: string;
  loveLanguage: string;
  interests: string[];
  foodPreferences: {
    favoriteCuisine: string;
    dietaryRestrictions: string;
    favoriteDishes: string;
    foodsToAvoid: string;
  };
  drinkPreferences: {
    favoriteBeverages: string;
    specificPreferences: string;
  };
  entertainmentPreferences: {
    favoriteMoviesShows: string;
    favoriteGenres: string;
    favoriteBooks: string;
    preferredStreamingPlatforms: string;
  };
  musicPreferences: {
    favoriteArtists: string;
    favoriteGenres: string;
    playlists: string;
  };
  fitnessPreferences: {
    favoriteWorkouts: string;
    activityLevel: string;
    fitnessGoals: string;
  };
  sleepPreferences: {
    usualBedtime: string;
    morningOrEvening: string;
  };
  travelPreferences: {
    favoriteDestinations: string;
    travelGoals: string;
    travelStyle: string;
  };
  learningPreferences: {
    topicsOfInterest: string;
    learningStyle: string;
    currentlyLearning: string;
  };
  socialPreferences: {
    preferredActivities: string;
    socialStyle: string;
    groupSize: string;
  };
  workPreferences: {
    careerGoals: string;
    workStyle: string;
    skillsToLearn: string;
  };
  aiPreferences: {
    chatStyle: string;
    notificationFrequency: string;
    topicsToAvoid: string;
    privacySettings: string;
  };
}

// Add validation for form fields
const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'email':
      return !value.includes('@') ? 'Invalid email address' : null;
    case 'name':
      return value.length < 2 ? 'Name is too short' : null;
    default:
      return null;
  }
};

// Add new section for handling unsaved changes
const useUnsavedChanges = (initialProfile: Profile) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const checkChanges = useCallback((currentProfile: Profile) => {
    const changed = JSON.stringify(currentProfile) !== JSON.stringify(initialProfile);
    setHasUnsavedChanges(changed);
  }, [initialProfile]);

  return { hasUnsavedChanges, checkChanges };
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Move profile state initialization before useUnsavedChanges
  const [profile, setProfile] = useState<Profile>({
    name: "Stephanie",
    email: "stephanie@example.com",
    birthday: "1995-06-15",
    location: "San Francisco, CA",
    aboutMe: "I'm an adventurous spirit who loves exploring new places and trying new things.",
    lifeGoals: "To travel to at least 30 countries and make a positive impact.",
    lookingFor: "A companion who can engage in meaningful conversations.",
    communicationStyle: "Deep & Meaningful",
    loveLanguage: "Words of Affirmation",
    interests: ["Music", "Travel", "Photography", "Cooking"],
    foodPreferences: {
      favoriteCuisine: "Italian, Japanese",
      dietaryRestrictions: "Vegetarian",
      favoriteDishes: "Pasta, Sushi",
      foodsToAvoid: "Spicy foods"
    },
    drinkPreferences: {
      favoriteBeverages: "Green tea, Craft coffee",
      specificPreferences: "No alcohol"
    },
    entertainmentPreferences: {
      favoriteMoviesShows: "Documentaries, Sci-fi series",
      favoriteGenres: "Mystery, Science Fiction",
      favoriteBooks: "Self-development, Fiction",
      preferredStreamingPlatforms: "Netflix, Prime Video"
    },
    musicPreferences: {
      favoriteArtists: "Various indie artists",
      favoriteGenres: "Indie pop, Classical",
      playlists: "Morning motivation, Focus music"
    },
    fitnessPreferences: {
      favoriteWorkouts: "Yoga, Running",
      activityLevel: "Moderately Active",
      fitnessGoals: "Maintain healthy lifestyle"
    },
    sleepPreferences: {
      usualBedtime: "10:30 PM",
      morningOrEvening: "Morning person"
    },
    travelPreferences: {
      favoriteDestinations: "Japan, Italy, New Zealand",
      travelGoals: "Visit every continent",
      travelStyle: "Cultural"
    },
    learningPreferences: {
      topicsOfInterest: "Languages, Psychology",
      learningStyle: "Visual",
      currentlyLearning: "Japanese language"
    },
    socialPreferences: {
      preferredActivities: "Small gatherings, Coffee meetups",
      socialStyle: "Ambivert",
      groupSize: "Small groups (3-5 people)"
    },
    workPreferences: {
      careerGoals: "Start own business",
      workStyle: "Remote with occasional meetings",
      skillsToLearn: "Digital marketing, Public speaking"
    },
    aiPreferences: {
      chatStyle: "Friendly",
      notificationFrequency: "Daily",
      topicsToAvoid: "Politics, Religion",
      privacySettings: "Share only necessary information"
    }
  });

  // Now we can use profile in useUnsavedChanges
  const { hasUnsavedChanges, checkChanges } = useUnsavedChanges(profile);

  // Move toggleInterest inside the component
  const toggleInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));

    setProfile(prev => {
      const updated = { ...prev, [name]: value };
      checkChanges(updated);
      return updated;
    });
  };

  const handleSave = () => {
    // Validate all fields before saving
    const newErrors: Record<string, string> = {};
    Object.entries(profile).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const error = validateField(key, value);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving",
        variant: "destructive",
      });
      return;
    }

    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      // Show confirmation dialog
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (!confirm) return;
    }
    setIsEditing(false);
    setErrors({});
  };

  // Add the edit/save buttons with proper styling
  const ActionButton = () => (
    <Button
      variant={isEditing ? "destructive" : "secondary"}
      size="icon"
      onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
      className="bg-white hover:bg-gray-100 text-gray-800"
    >
      {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
    </Button>
  );

  // Add the save button with loading state
  const SaveButton = () => (
    <Button
      onClick={handleSave}
      variant="default"
      className="bg-black hover:bg-gray-800 text-white gap-2"
      disabled={Object.keys(errors).length > 0}
    >
      <Save className="h-4 w-4" />
      Save Changes
    </Button>
  );

  const handleSelectChange = (name: string) => (value: string) => {
    const keys = name.split('.');
    if (keys.length === 1) {
      setProfile(prev => ({ ...prev, [name]: value }));
    } else {
      const [category, field] = keys;
      setProfile(prev => {
        // Get the correct type for the category
        const categoryData = prev[category as keyof Profile];
        if (typeof categoryData === 'object' && categoryData !== null) {
          return {
            ...prev,
            [category]: {
              ...categoryData,
              [field]: value
            }
          };
        }
        return prev;
      });
    }
  };

  const toggleCuisine = (cuisine: string) => {
    setProfile(prev => ({
      ...prev,
      foodPreferences: {
        ...prev.foodPreferences,
        favoriteCuisine: prev.foodPreferences.favoriteCuisine
          .split(", ")
          .filter(c => c.length > 0)
          .includes(cuisine)
          ? prev.foodPreferences.favoriteCuisine
              .split(", ")
              .filter(c => c !== cuisine)
              .join(", ")
          : prev.foodPreferences.favoriteCuisine
              .split(", ")
              .filter(c => c.length > 0)
              .concat(cuisine)
              .join(", ")
      }
    }));
  };

  return (
    <InteractiveBackground>
      <GradientBackground>
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <div className="flex items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-8">
              <Logo />
              <h1 className="text-2xl sm:text-3xl text-black">
                Profile
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ActionButton />
              {isEditing && <SaveButton />}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-md border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-medium text-black">
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription className="text-black/60">Your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Name</label>
                        <Input 
                          name="name"
                          disabled={!isEditing}
                          value={profile.name}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Birthday</label>
                        <Input 
                          name="birthday"
                          type="date"
                          disabled={!isEditing}
                          value={profile.birthday}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Location</label>
                        <Input 
                          name="location"
                          disabled={!isEditing}
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
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                      <CardDescription className="text-black/60">Tell us about yourself</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Bio</label>
                        <Textarea
                          name="aboutMe"
                          disabled={!isEditing}
                          value={profile.aboutMe}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100 min-h-[100px]"
                          placeholder="Share something about yourself"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Life Goals</label>
                        <Textarea
                          name="lifeGoals"
                          disabled={!isEditing}
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
                    <CardHeader>
                      <CardTitle>Interests</CardTitle>
                      <CardDescription className="text-black/60">Select your interests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {availableInterests.map((interest) => (
                          <Badge 
                            key={interest}
                            variant="secondary"
                            className={`
                              cursor-pointer transition-all duration-200 border
                              ${profile.interests.includes(interest) 
                                ? 'bg-black text-white hover:bg-gray-800 border-black' 
                                : 'bg-white/10 text-gray-600 hover:bg-white/20 border-black/50'
                              }
                              ${!isEditing && 'cursor-default'}
                            `}
                            onClick={() => isEditing && toggleInterest(interest)}
                          >
                            {interest}
                            {isEditing && profile.interests.includes(interest) && (
                              <span className="ml-1">✓</span>
                            )}
                          </Badge>
                        ))}
                      </div>
                      {isEditing && (
                        <p className="text-black/60 text-sm mt-2">
                          Click to select/deselect interests
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Communication Preferences */}
                  <Card className="bg-white/90 backdrop-blur-md border-none">
                    <CardHeader>
                      <CardTitle>Communication Preferences</CardTitle>
                      <CardDescription className="text-black/60">How you prefer to interact</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Communication Style</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.communicationStyle}
                          onValueChange={handleSelectChange("communicationStyle")}
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
                        <label className="text-black text-sm font-medium">Love Language</label>
                        <Select
                          disabled={!isEditing}
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
                      <CardDescription className="text-black/60">Your daily routines and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Activity Level</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.fitnessPreferences.activityLevel}
                          onValueChange={handleSelectChange("fitnessPreferences.activityLevel")}
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
                        <label className="text-black text-sm font-medium">Social Style</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.socialPreferences.socialStyle}
                          onValueChange={handleSelectChange("socialPreferences.socialStyle")}
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
                      <CardDescription className="text-black/60">Your professional and educational preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Learning Style</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.learningPreferences.learningStyle}
                          onValueChange={handleSelectChange("learningPreferences.learningStyle")}
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
                        <label className="text-black text-sm font-medium">Work Style</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.workPreferences.workStyle}
                          onValueChange={handleSelectChange("workPreferences.workStyle")}
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
                    <CardHeader>
                      <CardTitle>Food & Drink</CardTitle>
                      <CardDescription className="text-black/60">Your culinary preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Favorite Cuisines</label>
                        <div className="flex flex-wrap gap-2">
                          {availableCuisines.map((cuisine) => {
                            const selectedCuisines = profile.foodPreferences.favoriteCuisine
                              .split(", ")
                              .filter(c => c.length > 0);
                            
                            return (
                              <Badge 
                                key={cuisine}
                                variant="secondary"
                                className={`
                                  cursor-pointer transition-all duration-200 border
                                  ${selectedCuisines.includes(cuisine)
                                    ? 'bg-black text-white hover:bg-gray-800 border-black' 
                                    : 'bg-white/10 text-gray-600 hover:bg-white/20 border-black/50'
                                  }
                                  ${!isEditing && 'cursor-default'}
                                `}
                                onClick={() => isEditing && toggleCuisine(cuisine)}
                              >
                                {cuisine}
                                {isEditing && selectedCuisines.includes(cuisine) && (
                                  <span className="ml-1">✓</span>
                                )}
                              </Badge>
                            );
                          })}
                        </div>
                        {isEditing && (
                          <p className="text-black/60 text-sm mt-2">
                            Click to select/deselect cuisines
                          </p>
                        )}
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Dietary Restrictions</label>
                        <Input
                          name="foodPreferences.dietaryRestrictions"
                          disabled={!isEditing}
                          value={profile.foodPreferences.dietaryRestrictions}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Any dietary restrictions?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Favorite Beverages</label>
                        <Input
                          name="drinkPreferences.favoriteBeverages"
                          disabled={!isEditing}
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
                    <CardHeader>
                      <CardTitle>Entertainment</CardTitle>
                      <CardDescription className="text-black/60">Your entertainment preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Favorite Movies & Shows</label>
                        <Textarea
                          name="entertainmentPreferences.favoriteMoviesShows"
                          disabled={!isEditing}
                          value={profile.entertainmentPreferences.favoriteMoviesShows}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What do you like to watch?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Favorite Books</label>
                        <Textarea
                          name="entertainmentPreferences.favoriteBooks"
                          disabled={!isEditing}
                          value={profile.entertainmentPreferences.favoriteBooks}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="What do you like to read?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Music Preferences</label>
                        <Textarea
                          name="musicPreferences.favoriteGenres"
                          disabled={!isEditing}
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
                    <CardHeader>
                      <CardTitle>Travel</CardTitle>
                      <CardDescription className="text-black/60">Your travel preferences and aspirations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Favorite Destinations</label>
                        <Textarea
                          name="travelPreferences.favoriteDestinations"
                          disabled={!isEditing}
                          value={profile.travelPreferences.favoriteDestinations}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                          placeholder="Where have you enjoyed traveling?"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Travel Goals</label>
                        <Textarea
                          name="travelPreferences.travelGoals"
                          disabled={!isEditing}
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
                    <CardHeader>
                      <CardTitle>Sleep & Daily Routine</CardTitle>
                      <CardDescription className="text-black/60">Your sleep and daily schedule preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Sleep Schedule</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.sleepPreferences.morningOrEvening}
                          onValueChange={handleSelectChange("sleepPreferences.morningOrEvening")}
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
                        <label className="text-black text-sm font-medium">Usual Bedtime</label>
                        <Input
                          type="time"
                          name="sleepPreferences.usualBedtime"
                          disabled={!isEditing}
                          value={profile.sleepPreferences.usualBedtime}
                          onChange={handleInputChange}
                          className="bg-white/20 text-black disabled:text-black disabled:opacity-100"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Interaction Preferences */}
                  <Card className="bg-white/100 backdrop-blur-md border-none">
                    <CardHeader>
                      <CardTitle>AI Interaction</CardTitle>
                      <CardDescription className="text-black/60">How you prefer to interact with your AI companion</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Chat Style</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.aiPreferences.chatStyle}
                          onValueChange={handleSelectChange("aiPreferences.chatStyle")}
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
                        <label className="text-black text-sm font-medium">Notification Frequency</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.aiPreferences.notificationFrequency}
                          onValueChange={handleSelectChange("aiPreferences.notificationFrequency")}
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
                        <label className="text-black text-sm font-medium">Topics to Avoid</label>
                        <Textarea
                          name="aiPreferences.topicsToAvoid"
                          disabled={!isEditing}
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
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription className="text-black/60">Control your data and privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-black text-sm font-medium">Privacy Level</label>
                        <Select
                          disabled={!isEditing}
                          value={profile.aiPreferences.privacySettings}
                          onValueChange={handleSelectChange("aiPreferences.privacySettings")}
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
                        <label className="text-black text-sm font-medium">Data Sharing Preferences</label>
                        <Textarea
                          name="aiPreferences.privacySettings"
                          disabled={!isEditing}
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
                <SaveButton />
              </div>
            )}
          </div>
        </div>
      </GradientBackground>
    </InteractiveBackground>
  );
} 