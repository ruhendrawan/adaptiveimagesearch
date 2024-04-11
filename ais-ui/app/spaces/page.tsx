'use client';

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import NewSpaceForm from "@/components/new-space-form";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link";

export default function SpacesPage() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<div className="flex flex-col gap-8 items-start">
			<h1 className="text-2xl font-bold">Your Spaces</h1>
			<Input type="text" placeholder="Search ..." variant="faded" size="sm" className="w-96 -mt-4" />
			<Button color="primary" size="sm" onPress={onOpen}>New Creative Space</Button>

			<div className="flex flex-wrap gap-4">
				<Link href="/spaces/1"><Button>Space 1</Button></Link>
				<Link href="/spaces/2"><Button>Space 2</Button></Link>
			</div>

			<NewSpaceForm isOpen={isOpen} onOpenChange={onOpenChange} />
		</div>
	);
}

// TODO: { "category1": [ { "title": "...", "url": "..." }, ... ], ... }
// TODO: add a link back to spaces "back to spaces"
// TODO: add a link to go the space "view space"