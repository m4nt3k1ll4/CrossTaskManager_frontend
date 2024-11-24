import { Comment } from './comment.model';
import { Image } from './image.model';


export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export class Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  due_date: Date;
  comments: Comment[];
  images: Image[];

  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.title = json.title || '';
    this.description = json.description || '';
    this.priority = json.priority || Priority.Low;
    this.due_date = json.due_date ? json.due_date : new Date();
    this.comments = json.comments
      ? json.comments.map((item: Comment) => new Comment(item))
      : [];
    this.images = json.images
      ? json.images.map((item: Image) => new Image(item))
      : [];
  }
}


