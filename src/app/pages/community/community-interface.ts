export interface DiscussionTopic {
  title: string;
  content: string;
  isClosed: boolean; // Aggiunto campo isClosed
}

export interface Announcement {
  title: string;
  content: string;
}



export interface FAQ {
  question: string;
  answer: string;
}

export interface UserReview {
  user: string;
  comment: string;
  rating: number;
}
export interface CommunityEvent {

  name: string;
  date: Date;
  description: string;

}

// Aggiorna anche le altre interfacce se necessario...
