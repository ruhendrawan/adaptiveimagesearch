// import { Input } from "@nextui-org/input";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

import prisma from '@/lib/db-prisma'
import { Space } from '.prisma/client';

// import { cache } from 'react';

// export const getSpaces = cache(async (id: string) => {
// 	try {
// 		return await prisma.space.findMany();
// 	} catch (error) {
// 		console.error('Database Error:', error);
// 		throw new Error('Failed to fetch data.');
// 	}
// })


async function getSpaces(): Promise<Space[]> {
	try {
		return await prisma.space.findMany();
	} catch (error) {
		console.error('Database Error:', error);
		throw new Error('Failed to fetch data.');
	}
}

export default async function SpacesPage() {
	const spaces = await getSpaces();

	return (
		<>
			<div className="flex flex-col gap-8 items-start">
				{/* <Input type="text" placeholder="Search ..." variant="faded" size="sm" className="w-96 -mt-4" /> */}

				<h1 className="text-2xl font-bold">Your Spaces</h1>
				<div className="flex flex-wrap gap-4">
					<Link href="/space/new" className={buttonVariants({ variant: "primary" })}>New Space</Link>
					{/* <NewSpaceForm/> */}
					{spaces.map((space) => (
						<Link key={space.id} href={`/space/${space.slug}`} className={buttonVariants({ variant: "default" })}>
							{space.name}
						</Link>
					))}
				</div>

			</div>
		</>
	);
}
