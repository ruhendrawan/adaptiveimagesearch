'use client';

import { Input } from "@nextui-org/input";
import Carusel from "@/components/carousel";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function SpacePage() {
	return (
		<div className="flex flex-col gap-8 items-start">
			<Link href="/spaces"><Button>Back to Spaces</Button></Link>
			<h1 className="text-2xl font-bold">Images related to</h1>

			<div className="flex items-center gap-2 -mt-4">
				<Input type="text" placeholder="Search ..." variant="faded" size="sm" className="w-96" />
				<Link href="/spaces/1"><Button>View Space</Button></Link>
			</div>

			<Carusel title="Category 1" items={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
			<Carusel title="Category 2" items={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
			<Carusel title="Category 3" items={[{ id: 1 }, { id: 2 }]} />
		</div>
	);
}
