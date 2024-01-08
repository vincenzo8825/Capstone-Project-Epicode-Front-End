// community.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface DiscussionReply {
  rating?: number;
  id: number;
  userName: string;
  text: string;
}

interface TrendingTopic {
  name: string;
  count: number;
}

interface RecentActivity {
  userName: string;
  text: string;
}

interface Discussion {
  id: number;
  userName: string;
  title: string;
  text: string;
  replies?: DiscussionReply[];
  replyText?: string;
}

interface UserDiscussion {
  title: string;
  text: string;
  userName:string
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  text: string;
  replies?: DiscussionReply[];
}

interface UserReview {
  userName: string;
  rating: number;
  text: string;
  anonymous: boolean;
}

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent {
  trendingTopics: TrendingTopic[] = [
    { name: 'Angular', count: 20 },
    { name: 'JavaScript', count: 15 },
    { name: 'Web Development', count: 10 }
  ];

  recentActivities: RecentActivity[] = [
    { userName: 'John Doe', text: 'Completed the "Angular Basics" course.' },
    { userName: 'Alice Smith', text: 'Started a discussion on "JavaScript Frameworks".' },
    { userName: 'Bob Johnson', text: 'Achieved the "Web Developer Pro" badge.' }
  ];

  discussions: Discussion[] = [
    {
      id: 1,
      userName: 'John Doe',
      title: 'Best Framework for Web Development',
      text: 'Which framework do you think is the best for web development? Share your thoughts!',
      replies: []
    }
  ];

  userDiscussion: UserDiscussion = {
    title: '',
    text: '',
    userName:''
  };

  reviews: Review[] = [
    { id: 4, userName: 'Jane Smith', rating: 5, text: 'Great community and valuable discussions.', replies: [] },
    { id: 5, userName: 'Charlie Brown', rating: 4, text: 'Helpful insights and friendly members.', replies: [] }
  ];

  userReview: UserReview = {
    userName: '',
    rating: 1,
    text: '',
    anonymous: false
  };

  realReviews: Review[] = [
    { id: 6, userName: 'John Doe', rating: 5, text: 'Excellent platform! It helped me enhance my skills.', replies: [] },
    { id: 7, userName: 'Sarah Johnson', rating: 4, text: 'Great place to connect with like-minded developers.', replies: [] }
  ];
getStarsArrayByRating: any;

  submitReview(reviewForm: NgForm): void {
    if (reviewForm.invalid) {
      // Gestisci il form non valido se necessario
      return;
    }

    const newReview: Review = {
      id: this.getNextId(this.realReviews),
      userName: this.userReview.anonymous ? 'Anonymous' : this.userReview.userName,
      rating: this.userReview.rating,
      text: this.userReview.text,
      replies: []
    };

    this.realReviews.push(newReview);

    // Reset userReview
    this.userReview = {
      userName: '',
      rating: 1,
      text: '',
      anonymous: false
    };

    // Reset il form
    reviewForm.resetForm();
  }
  createDiscussion(): void {
    if (!this.userDiscussion.title || !this.userDiscussion.text || !this.userDiscussion.userName) {
      // Gestisci la situazione in cui il titolo, il testo o il nome utente sono vuoti, se necessario
      return;
    }

    const newDiscussion: Discussion = {
      id: this.getNextId(this.discussions),
      userName: this.userDiscussion.userName,
      title: this.userDiscussion.title,
      text: this.userDiscussion.text,
      replies: []
    };

    this.discussions.push(newDiscussion);

    // Reset userDiscussion
    this.userDiscussion = {
      userName: '',
      title: '',
      text: ''
    };
  }

  replyToDiscussion(parentDiscussion: Discussion): void {
    const replyText = parentDiscussion.replyText;

    if (!parentDiscussion.replies) {
      parentDiscussion.replies = [];
    }

    const newReply: DiscussionReply = {
      id: this.getNextId(parentDiscussion.replies),
      userName: 'CurrentUserName',
      text: replyText || '',
      rating: undefined
    };

    parentDiscussion.replies.push(newReply);

    // Reset replyText
    parentDiscussion.replyText = '';
  }

  getTotalStars(review: Review | DiscussionReply): number {
    let totalStars = review.rating || 0; // Inizia con il numero di stelle nella recensione principale o risposta

    if ('replies' in review) {
      const replies = review.replies as Review[]; // Cast esplicito per sicurezza

      replies.forEach(reply => {
        if (reply.rating) {
          totalStars += reply.rating;
        }
        totalStars += this.getTotalStars(reply);
      });
    }

    return totalStars;
  }

  private getNextId(collection: { id: number }[]): number {
    return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
  }

  getStarsArray(rating: number | undefined): number[] {
    return rating ? Array.from({ length: rating }).map((_, index) => index + 1) : [];
}

  toggleAnonymous(): void {
    this.userReview.anonymous = !this.userReview.anonymous;
  }
}
