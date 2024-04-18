"use client"

import React, { useState, useEffect } from 'react';
import { Space } from '.prisma/client';
import { addToCollection } from './actions';
import Carousel from '@/components/carousel';

export default function CarouselGroup({ space, topics }: { space: Space; topics: string[] }) {
    const [keywordImages, setKeywordImages] = useState<{ [key: string]: any }>({});
    
    useEffect(() => {
        topics.forEach((topic) => {
            const fetchImages = async () => {
                try {
                    // console.debug(keywordImages);
                    // if (keywordImages[topic]) return;
                    // console.debug('fetching images for', topic);
                    setKeywordImages(prevImages => ({
                        ...prevImages,
                        [topic]: {
                            isLoading: true
                        }
                    }));            
                    const response = await fetch('http://0.0.0.0:8000/download_images/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ query: topic, limit: 5 })
                    });
                    const images = await response.json();
                    setKeywordImages(prevImages => ({
                        ...prevImages,
                        [topic]: {
                            isLoading: false,
                            data: images
                        }
                    }));            
                } catch (error) {
                    console.error('Failed to fetch images for', topic, error);
                }
            };
            fetchImages();
        });
    }, [topics]); // Re-run the effect if topics change

    if (Object.keys(keywordImages).length === 0) {
        return <div>Loading...</div>;
    // } else {
    // server action only
    //     revalidatePath(`/space/${newSpace.slug}/search`);
    }

    async function onSelect(title: string, item: any) {
        console.debug('Selected image:', title, item);
        await addToCollection(space, item.file, item.origin, title);
    }

    
    return (
        <>
            {Object.entries(keywordImages).map(([key, value]) => (
                <Carousel key={key} title={key} items={value || []} onSelect={onSelect}/>
            ))}
        </>
    );
}
