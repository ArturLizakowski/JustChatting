import { User } from "./user";
import { AddMessageDto } from "./add-message-dto";

export class Message {
  content: string;
  modifyDate: Date;
  fromMe: boolean;
  authorId: string;
  author: User;
}