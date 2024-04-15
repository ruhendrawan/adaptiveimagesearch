"use client"

import { Button } from "@nextui-org/button";
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from "@nextui-org/modal";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";


interface Props{
	children: React.ReactNode;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}	
	
export default function PageModal({ children, header = null, footer = null }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const router = useRouter();

    const onDismiss = useCallback(() => {
        router.back()
    }, [router]);

	return (
		<>
			<Modal isOpen={true} onOpenChange={onOpenChange} onClose={onDismiss} autoFocus={false}>
				<ModalContent>
					{(onClose: any) => (
						<>
							<ModalHeader className="flex flex-col gap-1">{ header }</ModalHeader>
							<ModalBody>{ children }</ModalBody>
							<ModalFooter>{ footer }</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
