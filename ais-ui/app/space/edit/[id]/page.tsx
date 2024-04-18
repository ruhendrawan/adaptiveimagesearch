'use client';

import { Input } from "@nextui-org/input";
import Carusel from "@/components/carousel";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

export default function EditSpacePage() {
	return (
		<div className="flex flex-col gap-8 items-start">
			<Link href="/spaces" className={buttonVariants({ variant: "default" })}>Back to Spaces</Link>
			<h1 className="text-2xl font-bold">Images related to</h1>

			<div className="flex items-center gap-2 -mt-4">
				<Input type="text" placeholder="Search ..." variant="faded" size="sm" className="w-96" />
				<Link href="/space/1" className={buttonVariants({ variant: "default" })}>View Space</Link>
			</div>

		</div>
	);
}
