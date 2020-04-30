import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { Message } from './entities/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  connectedUser: string;
  messageText: string;
  newMessage: Message = new Message();
  newUser: string;
  messageList: Message[] = [];
  usersList: string[] = [];

  constructor(private chatService: ChatService) {}
  ngOnInit() {
    this.logIn();
    this.chatService.getMessages().subscribe((message: Message) => {
      this.messageList.push(message);
      console.log(this.messageList);
    });
    this.chatService.getUsers().subscribe((users: string) => {
      this.usersList.push(users);
      console.log(this.usersList);
    });
  }

  public clearMessageList(){
    this.messageList = [];
  }

  public sendMessage() {
    this.newMessage.username = this.connectedUser;
    this.newMessage.text = this.messageText;
    this.chatService.sendMessage(this.newMessage);
    this.newMessage.username = '';
    this.newMessage.text = '';
    this.messageText = '';
  }

  public setUser() {
    this.chatService.setUser(this.newUser);
  }

  public logIn() {
    this.newUser = window.prompt('Write your username: ');
    if (this.newUser) {
      this.connectedUser = this.newUser;
      this.setUser();
    }
  }
}
