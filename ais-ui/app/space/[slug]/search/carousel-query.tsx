"use client"

import { useState, useEffect } from 'react';
import { Space, SpaceSearch } from '.prisma/client';
import { createSpaceSearch, getSpaceSearchKeywords } from './actions';
import CarouselGroup from "./carousel-group";

import { SpaceWithSearch } from '@/lib/db-prisma';


export default function CarouselQuery(
    { space, isNew }: { space: SpaceWithSearch, isNew: boolean }
) {
    const [topics, setTopics] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            if (space.SpaceSearch.length > 0) {
                let spaceSearch: SpaceSearch = space.SpaceSearch[0];
                if (isNew) {
                    spaceSearch = await createSpaceSearch(space);
                }
                setTopics(await getSpaceSearchKeywords(spaceSearch));
            }
        }
        fetchData();
    }, [space, isNew]);

    return (
        <CarouselGroup space={space} topics={topics} />
    )
}