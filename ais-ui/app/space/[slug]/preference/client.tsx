"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import type { TPreferenceCategories } from '@/data/user_preference_options.types';
import preferenceCategoriesJson from '@/data/user_preference_options.json';

import { updateSpacePreference } from './actions';


interface PreferenceClientPageProps {
    slug: string;
    preference: TPreferenceCategories;
}

export function PreferenceClientPage({ slug, preference }: PreferenceClientPageProps) {
    const router = useRouter();

    const [selections, setSelections] = useState<TPreferenceCategories>(preference);
    const preferenceCategories: TPreferenceCategories = preferenceCategoriesJson;

    // useEffect(() => {
    //     setSelections(preference);
    // }, []);

    const handleSelect = async (category: string, subcategory: string, option: string) => {
        const currentSelections = selections[category]?.[subcategory]?.options || [];
        const updatedSubcategorySelections = currentSelections.includes(option)
            ? currentSelections.filter(item => item !== option)  // Remove option if already present
            : [...currentSelections, option];                    // Add option if not present

        let newSelections = {
            ...selections,
            [category]: {
                ...selections[category],
                [subcategory]: {
                    llm_prompt: preferenceCategories[category]?.[subcategory]?.llm_prompt,
                    options: updatedSubcategorySelections,
                }
            },
        }
        Object.keys(newSelections).forEach(cat => {
            Object.keys(newSelections[cat]).forEach(subcat => {
                if (newSelections[cat][subcat].options.length === 0) {
                    delete newSelections[cat][subcat];  // Remove the subcategory if options are empty
                }
            });
            if (Object.keys(newSelections[cat]).length === 0) {
                delete newSelections[cat];  // Remove the category if it has no subcategories
            }
        });

        setSelections(newSelections);


        const newSpace = await updateSpacePreference({ slug: slug, preference: newSelections })
        if (newSpace) {
            console.log('Preferences saved successfully!');
        } else {
            console.error('Failed to save preferences');
        }

        console.log(selections);
    };

    const handleSubmit = async () => {
        router.push(`/space/${slug}`);
    };

    return (
        <div>
            {Object.entries(preferenceCategories).map(([category, subcategories]) => (
                <div key={category}>
                    <h2 className='text-default-400 font-bold'>{category}</h2>
                    <div className='border rounded mb-8 pt-4'>
                        {Object.entries(subcategories).map(([subcategory, { options }]) => (
                            <div key={subcategory} className="pb-4 pl-4">
                                <CheckboxGroup
                                    label={subcategory}
                                    orientation="horizontal"
                                    color="secondary"
                                    defaultValue={selections[category]?.[subcategory]?.options}
                                >
                                    {options.map(option => (
                                        <Checkbox value={option}
                                            key={option}
                                            checked={selections[category]?.[subcategory]?.options.includes(option) || false}
                                            onChange={() => handleSelect(category, subcategory, option)}
                                        >
                                            {option}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <Button onClick={handleSubmit}>Save Preferences</Button>
        </div>
    );
};
