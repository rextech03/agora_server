export interface ChatMessage {
  senderId: number;
  message: string;
  timestamp: number;
}

export interface ChatRoom {
  id: number;
  patientId: number;
  clinicianId: number;
  messages: ChatMessage[];
}

// Simple in-memory storage (replace with DB in production)
const chatRooms: ChatRoom[] = [];

let nextChatId = 1;

/**
 * Create a new chat room between patient and clinician
 */
export const createChatRoom = (patientId: number, clinicianId: number): ChatRoom => {
  const chatRoom: ChatRoom = {
    id: nextChatId++,
    patientId,
    clinicianId,
    messages: []
  };
  chatRooms.push(chatRoom);
  return chatRoom;
};

/**
 * Send a message in a chat room
 */
export const sendMessage = (chatId: number, senderId: number, message: string): ChatMessage => {
  const chatRoom = chatRooms.find(c => c.id === chatId);
  if (!chatRoom) throw new Error('Chat room not found');

  const chatMessage: ChatMessage = {
    senderId,
    message,
    timestamp: Date.now()
  };

  chatRoom.messages.push(chatMessage);
  return chatMessage;
};

/**
 * Get chat messages for a room
 */
export const getMessages = (chatId: number): ChatMessage[] => {
  const chatRoom = chatRooms.find(c => c.id === chatId);
  if (!chatRoom) throw new Error('Chat room not found');
  return chatRoom.messages;
};
