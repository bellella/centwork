'use server';

import prisma from '@/lib/db/prisma';
import { MessageRoom, ProductStatus } from '@prisma/client';
import { ExtendedProduct } from '@/types/extendProduct';

export async function getProduct(roomId: string): Promise<ExtendedProduct | null> {
  const productWithRoom = await prisma.messageRoom.findUnique({
    where: {
      id: roomId, // your room ID
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productWithRoom?.productId,
    },
    include: {
      transactions: true,
      reservations: true,
    },
  });

  return product;
}

export async function getRoomInfo(roomId: string): Promise<MessageRoom | null> {
  const room = await prisma.messageRoom.findUnique({
    where: {
      id: roomId,
    },
  });
  return room;
}

export async function updateProductStatus(
  productId: string,
  status: ProductStatus,
  userId: string
) {
  try {
    if (status === ProductStatus.SOLD) {
      await prisma.transaction.create({
        data: {
          productId,
          userId,
        },
      });
    }

    if (status === ProductStatus.RESERVED) {
      await prisma.reservation.create({
        data: {
          productId,
          userId,
        },
      });
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: { status },
    });

    return { success: true, product };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update product status' };
  }
}
