"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
import { useRouter } from 'next/navigation';
// import Router from 'next/router';

import { createSpace } from './actions';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import PageModal from '@/components/page-modal';

import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
	spaceName: z.string().min(2, {
		message: "Space name must be at least 2 characters.",
	}),
})


export default function NewSpaceForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter();

	// const [spaceName, setSpaceName] = useState('');
	// const handleCreateSpace = async () => {
	// 	const newSpace = await createSpace(spaceName);
	// 	if (newSpace && newSpace.slug) {
	// 		router.push(`/space/${newSpace.slug}`);
	// 	}
	// };

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			spaceName: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		// event.preventDefault()
		setIsLoading(true)
		try {
			router.back();
			const newSpace = await createSpace(values.spaceName)
			if (newSpace && newSpace.slug) {
			// 	// router.push(`/space/${newSpace.slug}/search`,
			// 	// 	{ forceOptimisticNavigation: true })
			// 	// Router.reload();
				router.replace(`/space/${newSpace.slug}/search`)
				router.refresh()
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false);
		}
	}


	const inputEl = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		inputEl.current?.focus();
	});


	return (
		<>
		    <PageModal header="New Space">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="spaceName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											autoFocus={true}
											autoComplete="off"
											placeholder="Type in the space name"
											{...field}
											ref={(e) => {
												field.ref(e);
												inputEl.current = e;
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button color="primary" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</Button>
					</form>
				</Form>
			</PageModal>
		</>
	);
}
