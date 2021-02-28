export interface firebaseUserProfile {
  uid: string,
  displayName: string,
  photoURL: string,
  selfIntroduction: string
}

export interface firebasePost {
  description: string,
  id: string,
  poster: string,
  timestamp: number,
  url: string
  likeUsers: string[]
}