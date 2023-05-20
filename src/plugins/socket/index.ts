import io, { Socket } from 'socket.io-client';
import { REACT_APP_SOCKET_BASE_URL } from 'utils/env';

export const SocketEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  WEB_APP_USER_LOGIN: 'web_app_user_login',
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
    if (socket) {
      this.login(info);
    } else {
      socket = io(REACT_APP_SOCKET_BASE_URL as string, {
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
};
