export interface Profile {
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