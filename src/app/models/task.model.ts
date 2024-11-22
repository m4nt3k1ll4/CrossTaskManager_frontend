import { Comment } from './comment.model';
import { Image } from './image.model';


export class Task {

  id: number;
  title: string;
  description: string;
  priority: string;
  due_date: Date ;
  comments: Comment[];
  images: Image[];

  constructor(json: any = {}) {
      this.id = json.id || 0;
      this.title = json.title || '';
      this.description = json.description || '';
      this.priority = json.priority || 'low';
      this.due_date = new Date(json.due_date) ;
      this.comments = json.comments? json.comments.map((item:Comment) => new Comment(item)) : [];
      this.images = json.images? json.images.map((item:Image) => new Image(item)) :[];
  }
}


