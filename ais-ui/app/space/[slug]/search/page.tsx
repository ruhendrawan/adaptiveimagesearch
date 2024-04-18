import Link from "next/link";
import { redirect } from 'next/navigation'

import { buttonVariants } from "@/components/ui/button";

import { getSpaceBySlug } from './actions';
import CarouselQuery from './carousel-query';


type Props = {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}


export default async function SearchSpacePage(
	{ params, searchParams }: Props,
) {
	const is_new = 'new' in searchParams;
	const search_id = Number(searchParams['id']);
	const space = await getSpaceBySlug(params.slug, search_id);
	if (space.SpaceSearch.length === 0 && !is_new) {
		redirect(`/space/${params.slug}/search?new`);
		return null;
	}


	return (
		<div className="flex flex-col gap-8 items-start">
			<div className="flex gap-2 align-middle">
				<div className="center">
					<Link href={`/space/${space.slug}`} className={buttonVariants({ variant: "ghost" })}>Back to: {space.name}</Link>
				</div>
			</div>

			<CarouselQuery space={space} isNew={is_new} />
		</div>
	);
}
