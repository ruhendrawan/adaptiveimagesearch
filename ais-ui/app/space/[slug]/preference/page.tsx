import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

import { redirect } from 'next/navigation';

import type { TPreferenceCategories } from '@/data/user_preference_options.types';
import preferenceCategoriesJson from '@/data/user_preference_options.json';
import { getSpacePreference, updateSpacePreference } from './actions';
import { PreferenceClientPage } from './client';
import { Form } from "react-hook-form";

import { SubmitButton } from "@/components/submit-button";

export default async function PreferencePage(
    { params }: { params: { slug: string } }
) {

    let selections: TPreferenceCategories = {};
    const current_preference = await getSpacePreference(params.slug);
    if (current_preference) {
        try {
            selections = JSON.parse(current_preference.toString());
        } catch (error) {
            console.error('Failed to parse preferences:', error);
            return;
        }
        console.debug('Current preferences:', selections);
    }

    const preferenceCategories: TPreferenceCategories = preferenceCategoriesJson;

    // const handleSubmit = async (formData: FormData) => {
    //     "use server"

    //     console.debug(formData.get(""));
    //     const space =
    //         await updateSpacePreference({
    //             slug: params.slug, preference: selections
    //         })
    //     if (space) {
    //         console.debug('Preferences saved successfully!');
    //     } else {
    //         console.error('Failed to save preferences');
    //     }
    //     redirect(`/space/${params.slug}`);
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();  // Prevent default form submission behavior
    //     const formData = new FormData(event.target);
    //     let newSelections = { ...selections };

    //     // Iterate over each category and subcategory to update selections based on form data
    //     Object.entries(preferenceCategories).forEach(([category, subcategories]) => {
    //         newSelections[category] = newSelections[category] || {};
    //         Object.keys(subcategories).forEach(subcategory => {
    //             const optionsFromForm = formData.getAll(`${category}-${subcategory}`);
    //             newSelections[category][subcategory] = { options: optionsFromForm };
    //         });
    //     });

    //     console.debug('New preferences to save:', newSelections);

    //     try {
    //         const updatedSpace = await updateSpacePreference({
    //             slug: params.slug,
    //             preference: newSelections
    //         });

    //         if (updatedSpace) {
    //             console.debug('Preferences saved successfully!');
    //             redirect(`/space/${params.slug}`);
    //         } else {
    //             console.error('Failed to save preferences');
    //         }
    //     } catch (error) {
    //         console.error('Error saving preferences:', error);
    //     }
    // };


    return (
        <>
            {/* <form action={handleSubmit}>
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
                                            name={`${category}-${subcategory}`}
                                        >
                                            {options.map(option => (
                                                <Checkbox value={option}
                                                    key={option}
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
                </div>
                <Button type="submit">Save Preferences</Button>
            </form> */}

            <PreferenceClientPage slug={params.slug} preference={selections} />
        </>
    );
};