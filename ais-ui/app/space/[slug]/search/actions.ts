"use server"

import prisma from '@/lib/db-prisma'
import { Space, SpaceSearch } from '.prisma/client';

import OpenAI from "openai";
import { get } from 'http';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});


export async function getOrCreateSpaceSearch(space: Space): Promise<[SpaceSearch, string[]]> {
	try {
		const spaceSearch = await prisma.spaceSearch.findFirst({
			where: {
				space_id: space.id,
			},
			orderBy: {
				created_at: 'desc',
			},
		});

		if (spaceSearch) {
			return [spaceSearch, getSpaceSearchKeywords(spaceSearch)];
		}

		const llm_model = "gpt-3.5-turbo";
		const llm_params = {
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		};
		const llm_prompt = `List 10 important sub-topics about "${space.name}".`;
		const response = await openai.chat.completions.create({
			model: llm_model,
			messages: [
				{
					role: "system",
					content:
						"Respond in JSON {type:array,topics:{type:string}}",
				},
				{
					role: "user",
					content: llm_prompt
				}
			],
			response_format: { "type": "json_object" },
			...llm_params,
		});

		let llm_response_content = response.choices[0].message.content;
		let expandedKeywords = "";
		let parsedResponse;
		try {
			parsedResponse = JSON.parse(llm_response_content as string);
			expandedKeywords = parsedResponse.topics.join("|");
		} catch (error) {
			console.error('Failed to parse JSON response:', error);
		}

		const newSpaceSearch = await prisma.spaceSearch.create({
			data: {
				space_id: space.id,
				search_keyword: space.name,
				llm_model: llm_model,
				llm_params: JSON.stringify(llm_params),
				llm_prompt: llm_prompt,
				llm_response: response.choices[0].message.content,
				llm_keywords: expandedKeywords,
			},
		});

		return [newSpaceSearch, getSpaceSearchKeywords(newSpaceSearch)];
	} catch (error) {
		console.error('Error interacting with database or OpenAI:', error);
		throw new Error('Failed to process space search data.');
	}
}

function getSpaceSearchKeywords(spaceSearch: SpaceSearch): string[] {
	let keywords = [spaceSearch.search_keyword];
	if (spaceSearch.llm_keywords !== null) {
        keywords = keywords.concat(spaceSearch.llm_keywords.split("|"));
    }
	return keywords.slice(0, 5);
}

export async function getSpaceBySlug(slug: string): Promise<Space> {
	try {
		return await prisma.space.findFirstOrThrow({
			where: { slug },
		})
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch data.');
	}
}
