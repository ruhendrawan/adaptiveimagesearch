import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from "@nextui-org/modal";

export default function Carusel({ title, items }: { title: string, items: any }) {
	return (
		<div className="flex flex-col gap-2">
			{title ? <h2 className="text-sm font-bold">{title}</h2> : null}
			<div className="flex items-start gap-4">
				{items.map((item: any) => (
					<div key={item.id} className="w-64 h-40 border rounded bg-gray-200 flex flex-col gap-2 items-center justify-center p-2">
						<span>PLACEHOLDER</span>
						<Button size="sm" color="secondary">Select</Button>
					</div>
				))}
			</div>
		</div>
	);
}
