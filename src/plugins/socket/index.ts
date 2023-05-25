import { IConversation } from 'redux/chat/type';
import io, { Socket } from 'socket.io-client';
import { REACT_APP_SOCKET_BASE_URL } from 'utils/env';
import { STORAGE_KEY, getDataStorage } from 'utils/storage';

export const SocketEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  WEB_APP_USER_LOGIN: 'web_app_user_login',
  CREATE_CONVERSATION: 'create_conversation',
  CREATE_MESSAGE: 'sent_message',
  RECEIVE_MESSAGE: 'receive_message',
};

let socket: Socket;

interface ISocketWepAppLogin {
  senderId: number;
  senderEmail: string;
}

export default {
  getSocket(): Socket {
    return socket;
  },
  connect(info: ISocketWepAppLogin): void {
    const token = getDataStorage(STORAGE_KEY.ACCESS_TOKEN);

    if (socket) {
      this.login(info);
    } else {
      socket = io(REACT_APP_SOCKET_BASE_URL as string, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
        reconnection: true,
      });
      if (info?.senderId) this.login(info);
    }
  },
  disconnect(): void {
    if (socket) {
      socket.disconnect();
    }
  },
  login(info: ISocketWepAppLogin): void {
    if (socket) {
      socket.emit(SocketEvents.WEB_APP_USER_LOGIN, info);
    }
  },
  createConversation(info: IConversation): void {
    if (socket) {
      socket.emit(SocketEvents.CREATE_CONVERSATION, info);
    }
  },
  createMessage(info: ICreateMessage): void {
    if (socket) {
      socket.emit(SocketEvents.CREATE_MESSAGE, info);
    }
  },
  receiveMessage(callBack: (payload: IMessage) => void) {
    if (socket) {
      socket.on(SocketEvents.RECEIVE_MESSAGE, callBack);
    }
  },
};
