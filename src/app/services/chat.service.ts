import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from '../entities/message';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages = new Subject();

  constructor(private socket: Socket) {}

  public sendMessage(message: Message) {
    this.socket.emit('new-message', message);
  }

  public setUser(user: string) {
    this.socket.emit('new-user', user);
  }

  public getMessages = () => {
    return new Observable((messageObserver) => {
      this.socket.on('new-message', (message) => {
        messageObserver.next(message);
      });
    });
  };

  public getUsers = () => {
    return new Observable((usersObserver) => {
      this.socket.on('new-user', (user) => {
        usersObserver.next(user);
      });
    });
  };
}
