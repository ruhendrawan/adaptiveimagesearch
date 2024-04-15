"use client"

import { useState, useEffect } from 'react';
import { Space, SpaceSearch } from '.prisma/client';
import { getOrCreateSpaceSearch } from './actions';
import CarouselGroup from "@/components/carousel-group";


export default function CarouselQuery(
    { space }: { space: Space }
) {
    const [topics, setTopics] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            const [spaceSearch, topics]: [SpaceSearch, string[]] =
                await getOrCreateSpaceSearch(space);
            setTopics(topics);
        }
        fetchData();
    }, [space]);

    return (
        <CarouselGroup topics={topics}/>
    )
}