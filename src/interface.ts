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
  comments: [
    {
      uid: string,
      displayName: string,
      content: string,
      photoURL: string,
    }
  ]
}

export interface firebasePostComment {
  uid: string,
  displayName: string,
  content: string,
  photoURL: string,
}