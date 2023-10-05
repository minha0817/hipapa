export type CreateMessageRequest = {
  messageRoomId: string;
  values: {
    message: string;
    attatchment?: string;
  };
};
