import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { roll } = req.body;

  try {
    // This searches your Prisma Postgres database for the roll number
    const student = await prisma.student.findUnique({
      where: { rollNumber: roll },
    });

    if (student) {
      return res.status(200).json({ success: true, name: student.name });
    } else {
      return res.status(401).json({ success: false, message: 'Roll not found' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Database error' });
  } finally {
    await prisma.$disconnect();
  }
}