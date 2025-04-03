'use server';

import prisma from '@/lib/db/prisma';
import { Product } from '@prisma/client';

export async function getProduct(roomId: string): Promise<Product | null> {
  const productWithRoom = await prisma.messageRoom.findUnique({
    where: {
      id: roomId, // your room ID
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productWithRoom?.productId,
    },
  });

  return product;
}
