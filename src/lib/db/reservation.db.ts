import prisma from "./prisma";

export function createReservation(productId: string, userId: string) {
    return prisma.reservation.create({
        data: { productId, userId },
    });
}
