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
            // If the search page is empty
            if (topics.length === 0) {
                let spaceSearch: SpaceSearch;
                // Force a new search
                if (isNew) {
                    spaceSearch = await createSpaceSearch(space);
                    setTopics(await getSpaceSearchKeywords(spaceSearch));
                } else {
                    // or grab the first search from db
                    if (space.SpaceSearch.length > 0) {
                        spaceSearch = space.SpaceSearch[0];
                        setTopics(await getSpaceSearchKeywords(spaceSearch));
                    }
                }
            }
        }
        fetchData();
    }, [space, isNew]);

    return (
        <CarouselGroup space={space} topics={topics} />
    )
}