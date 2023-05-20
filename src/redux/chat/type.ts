export interface IMessage {
  id: number;
  content: string;
  file: string;
  is_remove: boolean;
  is_unsent: boolean;
}

export interface IConversationUser {
  id: number;
  is_admin: boolean;
  mute: boolean;
  seen_last_message: boolean;
}

export interface IConversation {
  id: number;
  is_inbox: boolean;
  is_conversation_request: boolean;
  title: string | null;
  description: string | null;
  background: string | null;
  last_message_id: number | null;
  users: UserInfo[];
  message: IMessage[];
  conversationUser: IConversationUser;
}

export interface ConversationListResponse {
  items: IConversation[];
  totalItems: number;
}
