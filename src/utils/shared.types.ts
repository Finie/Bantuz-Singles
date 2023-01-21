/**
 * This file is defines all the shared types in the application
 */

export type Theme = 'light' | 'dark';

export type UserProfile = {
  username: string;
  password: string;
  first_name: string;
  email: string;
  last_name: string;
  middle_name: string;
  phone: string;
  profile: {
    birth_date: string; //2022-06-09
    gender: string;
    height: string;
    physical_frame: string;
    ethnicity: string;
    location: {
      google_place_id: string;
      name: string;
      longitude: number;
      latitude: number;
    };
    media: [
      {
        encoded_file: string;
        name: string;
        type: string; //image/png
        is_default: boolean;
      },
    ];
    bio: {
      bio: string;
      looking_for: string;
      languages: [{id: number; name: string}];
      passions: [{id: number; name: string}];
      other_details: [{id: number; name: string}];
    };
  };
  is_premium: boolean;
};

export type ExploreMatch = {
  first_name: string;
  last_name: string;
  username: string;
  bio: string;
  email: string;
  default_image: string;
  age: string;
  middle_name: string;
  id: string;
  phone: string;
  status: string;
};

export type UserMatchType = {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    username: string;
    phone: string;
    status: string;
    age: string;
    bio: string;
    created_on: string;
    last_modified_on: string;
    default_image: string;
  };
};

export type ConversationInfo = {
  conversation_id: number;
  user: {
    age: number;
    bio: string;
    created_on: string;
    email: string;
    first_name: string;
    id: number;
    last_modified_on: string;
    last_name: string;
    middle_name: string;
    phone: string;
    status: string;
    username: string;
    default_image: string;
  };
};

export type MessageItem = {
  content: string;
  created_on: string;
  id: number;
  sender: string;
};

export type SavedProfile = {
  token: string;
  id: string;
  username: string;
  is_premium: boolean;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  status: string;
  created_on: string;
  last_modified_on: string;
  profile: {
    birth_date: string;
    gender: string;
    height: string;
    physical_frame: string;
    ethnicity: string;
    location: {
      id: string;
      google_place_id: string;
      name: string;
      longitude: string;
      latitude: string;
    };
    media: [
      {
        id: string;
        name: string;
        path: string;
        type: string;
        is_default: boolean;
      },
    ];
    bio: {
      bio: string;
      looking_for: string;
    };
  };
};
