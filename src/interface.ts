export interface firebaseUserProfile {
  uid: string,
  displayName: string,
  photoURL: string,
  selfIntroduction: string,
  follow: string[

  ],
  follower: string[

  ]
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
      content: string,
    }
  ]
}

export interface firebasePostComment {
  uid: string,
  content: string,
  displayName: string,
  photoURL: string,
}