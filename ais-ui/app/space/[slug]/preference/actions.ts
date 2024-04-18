'use server'

import { Prisma, Space } from '@prisma/client';
import prisma from '@/lib/db-prisma';
import { eventLogger } from '@/lib/event-log';
import { revalidatePath } from 'next/cache';

import { TPreferenceCategories } from '@/data/user_preference_options.types';


interface StorePreferenceParams {
    slug: string;
    preference: TPreferenceCategories;  // Adjust the type as needed for your specific structure
}


export async function getSpacePreference(slug: string): Promise<Prisma.JsonValue> {
    try {
        const space: Space | null =
            await prisma.space.findFirst({
                where: {
                    slug: slug,
                },
            });

        return space ? space.search_preference : null;
    } catch (error) {
        console.error('Failed to fetch preferences:', error);
        throw new Error('Unable to fetch preferences');
    }
}

export async function updateSpacePreference({ slug, preference }: StorePreferenceParams) {
    try {
        eventLogger.logEvent({
            sessionId: "123",
            module: 'space.preference',
            event: slug
        });

        const space: Space = await prisma.space.update({
            where: {
                slug: slug,
                session_id: "123",
            },
            data: {
                search_preference: JSON.stringify(preference),
            },
        });

        revalidatePath(`/space/${space.slug}/preference`);
        return space;
        console.log('Preferences saved successfully.');
    } catch (error) {
        console.error('Failed to save preferences:', error);
        throw new Error('Unable to save preferences');
    }
}

