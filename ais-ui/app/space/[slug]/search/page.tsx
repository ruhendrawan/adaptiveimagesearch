import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { getSpaceBySlug } from './actions';
import CarouselQuery from './carousel-query';


export default async function SearchSpacePage(
	{ params }: { params: { slug: string } }
) {
	const space = await getSpaceBySlug(params.slug);

	return (
		<div className="flex flex-col gap-8 items-start">
			<div className="flex gap-2 align-middle">
				<div className="center">
					<Link href={`/space/${space.slug}`} className={buttonVariants({ variant: "ghost" })}>Back to: {space.name}</Link>
				</div>
			</div>

			<CarouselQuery space={space}/>
		</div>
	);
}
