'use server';

import prisma from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { UserUpdateData } from '@/types/user';

export async function updateUser(updateData: UserUpdateData) {
  const { email, password } = updateData;

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: updateData,
    });
    return { success: true, user };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update user' };
  }
}

export async function getSellerInfo(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      products: {
        select: {
          id: true,
          title: true,
          price: true,
          image: true,
          status: true,
          transactions: {
            select: {
              id: true,
              createdAt: true,
              rating: true,
              review: true,
              productId: true,
              userId: true,
            },
          },
        },
      },
    },
  });
  return user;
}
