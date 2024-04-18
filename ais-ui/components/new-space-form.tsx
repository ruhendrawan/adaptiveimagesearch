"use client"

import React, { useState } from 'react';
import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
import { useRouter } from 'next/navigation';
import { useDisclosure } from "@nextui-org/modal";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

import { createSpace } from './new-space-handler';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const [spaceName, setSpaceName] = useState('');
	const router = useRouter();

	const handleCreateSpace = async () => {
		const newSpace = await createSpace(spaceName);
		if (newSpace && newSpace.slug) {
			router.push(`/space/${newSpace.slug}`);
		}
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			spaceName: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		event?.preventDefault()
		setIsLoading(true)
		try {
			const newSpace = await createSpace(values.spaceName)
			if (newSpace && newSpace.slug) {
				router.push(`/space/${newSpace.slug}`)
			}
			console.debug(values)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false) // Set loading to false when the request completes
		}
	}


	return (
		<>
			<Button color="primary" onPress={onOpen}>Add New</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} autoFocus={false}>
				<ModalContent>
					{(onClose: any) => (
						<>
							<ModalHeader className="flex flex-col gap-1">New Space</ModalHeader>
							<ModalBody>
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
															placeholder="Type in the space name"
															{...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button color="primary" type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Submit'}</Button>
									</form>
								</Form>
							</ModalBody>
							<ModalFooter>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
