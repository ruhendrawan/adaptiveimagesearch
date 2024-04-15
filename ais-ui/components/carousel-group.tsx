"use client"

import React, { useState, useEffect } from 'react';
import Carousel from './carousel';

export default function CarouselGroup({ topics }: { topics: string[] }) {
    const [keywordImages, setKeywordImages] = useState<{ [key: string]: any }>({});
    
    useEffect(() => {
        topics.forEach((topic) => {
            const fetchImages = async () => {
                try {
                    // console.log(keywordImages);
                    // if (keywordImages[topic]) return;
                    console.log('fetching images for', topic);
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

    if (Object.keys(keywordImages).length === 0) return <div>Loading...</div>;
    console.log(Object.keys(keywordImages).length)

    return (
        <>
            {Object.entries(keywordImages).map(([key, value]) => (
                <Carousel key={key} title={key} items={value || []} />
            ))}
        </>
    );
}
