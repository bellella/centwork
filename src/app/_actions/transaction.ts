'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db/prisma';

export async function getTransactionHistory() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return redirect('/login');
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          userId: session.user.id,
        },
      ],
    },
    include: {
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          image: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return transactions;
}
