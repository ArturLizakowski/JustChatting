import { User } from "./user";
import { AddMessageDto } from "./add-message-dto";

export class Message {
  content: string;
  modify: string;
  authorId: string;
  author: User;
}