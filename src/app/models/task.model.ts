
import { Image } from './image.model';
import { UserTask } from './user-task.model';


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
  images: Image[];


  constructor(json: any = {}) {
    this.id = json.id || 0;
    this.title = json.title || '';
    this.description = json.description || '';
    this.priority = json.priority || Priority.Low;
    this.due_date = json.due_date ? json.due_date : new Date();
    this.images = json.images
      ? json.images.map((item: Image) => new Image(item))
      : [];
  }
}''


