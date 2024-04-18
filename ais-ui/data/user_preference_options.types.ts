
export interface TPreferenceOptions {
    llm_prompt: string;
    options: string[];
}

export interface TPreferenceSubCategories {
    [subcategory: string]: TPreferenceOptions;
}

export interface TPreferenceCategories {
    [category: string]: TPreferenceSubCategories;
}
