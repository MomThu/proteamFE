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
  messages: IMessage[];
  conversationUser: IConversationUser;
}

export interface ConversationListResponse {
  items: IConversation[];
  totalItems: number;
}
export type MessageResponse = IMessage;
export type CreateConversationResponse = IConversation;
