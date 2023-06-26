import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug, longUrl } = req.body;
    const generatedSlug = slug || generateUniqueSlug();

    try {
      const existingLink = await prisma.shortLink.findUnique({ where: { slug: generatedSlug } });
      if (existingLink) {
        res.status(400).json({ error: 'Slug already exists' });
        return;
      }

      const createdLink = await prisma.shortLink.create({
        data: {
          slug: generatedSlug,
          longUrl,
        },
      });

      res.status(200).json({ slug: createdLink.slug });
    } catch (error) {
      console.error('Error creating short link:', error);
      res.status(500).json({ error: 'An error occurred while creating the short link' });
    }
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}

function generateUniqueSlug() {
  const length = 6;
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return slug;
}
