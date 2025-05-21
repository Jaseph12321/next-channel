export type channel = {
  channelId: string;
  photoUrl: string;
  channelTitle: string;
  userId: string;
  subscriberCount: number;
};

export type myChannel = {
  channelId: string;
  photoUrl: string;
  title: string;
  userId: string;
  subscriberCount: number;
};

//===============================================
// user models

export type userParam = {
  id: string;
  name: string;
};

export type userData = {
  id: string;
  name: string;
  age: number;
  email: string;
};

export type createUserData = {
  id: string;
  name: string;
  age: number;
  email: string;
};
