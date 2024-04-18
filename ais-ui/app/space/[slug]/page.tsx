import Link from "next/link";
import { Image } from "@nextui-org/image";

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import { buttonVariants } from "@/components/ui/button"
import Carousel from "@/components/carousel";

import prisma from '@/lib/db-prisma'
import { Space, SpaceSearch, SpaceCollection } from '.prisma/client';

async function getSpaceById(slug: string): Promise<Space> {
	try {
		return await prisma.space.findFirstOrThrow({
			where: { slug },
			include: {
				SpaceSearch: {
					orderBy: { created_at: 'desc' },
				},
				SpaceCollection: {
					orderBy: { created_at: 'desc' },
				}
			}
		})
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch data.');
	}
}


export default async function SpacePage(
	{ params }: { params: { slug: string } }
) {
	const space: Space = await getSpaceById(params.slug);
	return (
		<>
			<div className="flex flex-col gap-2 items-start">
				<div className="flex gap-4">
					<Link href="/space" className={buttonVariants({ variant: "ghost" })}>Back to Spaces</Link>
					<h1 className="text-2xl font-bold">{space.name}</h1>
				</div>

				<div className="flex flex-wrap items-start gap-4 mb-4">
					{space.SpaceCollection.map((collection, index) => (
						<div key={collection.id}>
							<div className="w-64 h-40 flex flex-col gap-2 items-center mb-8">
								<Image src={`/images/${collection.search_keyword}/${collection.img_cache_url}`} alt={collection.img_url} width={400} height={300} className="h-40 w-full object-cover z-0" />
								{collection.search_keyword}
							</div>
						</div>
					))}
				</div>

				{space.SpaceSearch.map((search, index) => (
					<div key={search.id} className="max-w-md overflow-wrap">
						<Link color="primary" href={`/space/${space.slug}/search?id=${search.id}`} className={buttonVariants({ variant: "outline" })}>{search.llm_keywords.replaceAll('|', ', ').slice(0, 99)}</Link>
					</div>
				))}

				<div className="flex items-center gap-2">
					<Link href={`/space/${space.slug}/search?new`} className={buttonVariants({ variant: "outline" })}>Get more images</Link>
					<Link href={`/space/${space.slug}/preference`} className={buttonVariants({ variant: "link" })}>Preferences</Link>
				</div>

				<Carousel title="" items={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
			</div>
		</>
	);
}
