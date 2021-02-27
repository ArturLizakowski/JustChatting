import { User } from "./user";

export class Message {
  content: string;
  modify: string;
  authorId: string;
  author: User;
}