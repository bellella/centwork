import prisma from "./prisma";
import { MessageRoom, Message, User } from "@prisma/client";

type MessageRoomWithIncludes = MessageRoom & {
    buyer: User;
    seller: User;
    messages: Message[];
};

export function getMessageRoomsByUser(userId: string): Promise<MessageRoomWithIncludes[]> {
    return prisma.messageRoom.findMany({
        where: {
            OR: [
                { buyerId: userId },
                { sellerId: userId },
            ],
        },
        include: {
            buyer: true,
            seller: true,
            messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
            },
        },
        orderBy: { updatedAt: "desc" },
    });
}
