'use server'

import slugify from 'slugify';
import { PrismaClient, Space } from '@prisma/client';
import { eventLogger } from '@/lib/event-log';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createSpace(name: string) {
    try {
        eventLogger.logEvent({
            sessionId: "123",
            module: 'space.create',
            event: name
        });
        const prisma = new PrismaClient();
        const slug = slugify(name, { lower: true, strict: true, trim: true });

        const space: Space = await prisma.space.create({
            data: {
                name,
                slug,
                session_id: "123",
            },
        });

        revalidatePath(`/space`)
        // redirect(`/space/${space.slug}/search`);
        return space;
    } catch (error) {
        // Handle or throw the error depending on your application needs
        console.error("Failed to create space:", error);
        throw error;
    }
}

