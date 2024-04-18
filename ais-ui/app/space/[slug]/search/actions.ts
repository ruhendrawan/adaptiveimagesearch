"use server"

import { revalidatePath } from 'next/cache';

import prisma, { SpaceWithSearch } from '@/lib/db-prisma'
import { Space, SpaceSearch, SpaceCollection } from '.prisma/client';

import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});


export async function createSpaceSearch(space: Space): Promise<SpaceSearch> {
	try {
		const llm_model = "gpt-3.5-turbo";
		const llm_params = {
			temperature: 1,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		};
		// const llm_prompt = `List 10 important sub-topics about "${space.name}".`;
		// const llm_prompt = `Generate keywords that are specific to look for representative images of "${space.name}".`;
		const llm_prompt = `Generate sub-topics that are specific to look for representative images of "${space.name}".`;
		// const llm_prompt = `Generate sub-topics (keyword + explanation of releavance) that are specific to look for representative images of "${space.name}".`;

		const response = await openai.chat.completions.create({
			model: llm_model,
			messages: [
				{
					role: "system",
					content:
						// "You are a travel search engine that helps users find representative images of different travel destinations. " +
						// "You are a book illustration search engine that helps users find representative images of different book sections. " +
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

		return newSpaceSearch;
	} catch (error) {
		console.error('Error interacting with database or OpenAI:', error);
		throw new Error('Failed to process space search data.');
	}
}

export async function getSpaceSearchKeywords(spaceSearch: SpaceSearch): Promise<string[]> {
	if (!spaceSearch) {
		return [];
	}
	let keywords = [spaceSearch.search_keyword];
	if (spaceSearch.llm_keywords !== null) {
		keywords = keywords.concat(spaceSearch.llm_keywords.split("|"));
	}
	return keywords.slice(0, 5);
}

export async function getSpaceBySlug(slug: string, search_id?: number): Promise<SpaceWithSearch> {
	try {
		return await prisma.space.findFirstOrThrow({
			where: { slug },
			include: {
				SpaceSearch: {
					where: search_id ? { id: search_id } : {},
					// Orders to get the latest if no search_id is specified
					orderBy: { created_at: 'desc' },
					// Takes only one record, the latest based on the order
					take: 1
				}
			}
		})
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch data.');
	}
}

export async function addToCollection(
	space: Space, img_cache_url: string, img_url: string, search_keyword: string
): Promise<SpaceCollection> {
	try {
		console.log('Adding to collection:', space, img_cache_url, img_url, search_keyword);
		let hash = null;
		if (img_url) {
			const { createHash } = require('crypto');
			hash = createHash('sha256').update(img_url).digest('hex');
		}
		revalidatePath(`/space/${space.slug}`);
		return await prisma.spaceCollection.create({
			data: {
				space_id: space.id,
				search_keyword,
				img_cache_url,
				img_url,
				img_url_hash: hash,
			}
		});
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to add to collection.');
	}
}