import { Message, MessageRoom } from "@prisma/client";
import prisma from "./prisma";

export function createMessage(message: Pick<Message, 'name' | 'message' | 'ip' | 'roomId'>): Promise<Message> {
  return prisma.message.create({
    data: message,
  });
}

export function getMessages(): Promise<Message[]> {
    return prisma.message.findMany();
}

export function getMessagesByRoomId(roomId: string): Promise<Message[]> {
  return prisma.message.findMany({where: {roomId}});
}

export function getMessageRooms(): Promise<MessageRoom[]> {
  return prisma.messageRoom.findMany();
}
