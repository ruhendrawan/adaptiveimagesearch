'use client';

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/react";
import Carusel from "@/components/carousel";

export default function SpacePage() {
	return (
		<div className="flex flex-col gap-8 items-start">
			<h1 className="text-2xl font-bold">Space name</h1>

			<div className="flex items-center gap-2 -mt-4">
				<Button size="sm" color="secondary" variant="bordered">Recommend more images</Button>
				<Chip color="default">Category 1</Chip>
				<Chip color="default">Category 2</Chip>
				<Chip color="default">Category 3</Chip>
			</div>

			<Carusel title="" items={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
		</div>
	);
}
