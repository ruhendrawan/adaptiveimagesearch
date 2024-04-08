import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from "@nextui-org/modal";
import { useRouter } from 'next/navigation'

export default function NewSpaceForm({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: any }) {
	const router = useRouter();

	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose: any) => (
					<>
						<ModalHeader className="flex flex-col gap-1">New Space</ModalHeader>
						<ModalBody>
							<Input type="text" placeholder="Type in the space name" />
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onPress={() => {
								router.push('/spaces/edit/1');
							}}>Create</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
