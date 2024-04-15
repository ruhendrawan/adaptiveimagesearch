import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import Carusel from "@/components/carousel";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

import prisma from '@/lib/db-prisma'
import { Space } from '.prisma/client';

async function getSpaceById(slug: string): Promise<Space> {
	try {
		return await prisma.space.findFirstOrThrow({
			where: { slug },
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
			<div className="flex flex-col gap-8 items-start">
				<div className="flex gap-4">
					<Link href="/space" className={buttonVariants({ variant: "ghost" })}>Back to Spaces</Link>
					<h1 className="text-2xl font-bold">{space.name}</h1>
				</div>

				<div className="flex items-center gap-2 -mt-4">
					<Link href={`/space/${space.slug}/search`} className={buttonVariants({ variant: "outline" })}>Get more images</Link>
					<Chip color="default">Category 1</Chip>
					<Chip color="default">Category 2</Chip>
					<Chip color="default">Category 3</Chip>
				</div>

				<Carusel title="" items={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
			</div>
		</>
	);
}
