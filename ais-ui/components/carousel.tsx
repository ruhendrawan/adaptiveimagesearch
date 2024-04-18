import { Image } from "@nextui-org/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"


interface CarouselProps {
	title: string;
	items: any;
	onSelect: (title: string, item: any) => void;
}


export default function Carousel({ title, items, onSelect }: CarouselProps) {
	return (
		<div className="flex flex-col gap-2">
			{title ? <h2 className="text-sm font-bold">{title}</h2> : null}
			<div className="flex items-start gap-4">
				{items.isLoading && (
					<div className="w-64 h-40 flex flex-col gap-2 items-center justify-center">
						<Skeleton className="rounded-lg"><div className="w-64 h-40 rounded-lg bg-default-300"></div></Skeleton>
					</div>
				)}
				{items.data && Array.isArray(items.data.urls) && (items.data.urls.map((item: any) => item.file && (
					<div key={item.file}>
						<div className="w-64 h-40 flex flex-col gap-2 items-center">
							<Image src={`/images/${title}/${item.file}`} alt={item.origin} width={400} height={300} className="h-40 w-full object-cover z-0" />
							<Button size="sm" variant="outline" className="relative -my-12 z-10" onClick={() => onSelect(title, item)}>
								Select
							</Button>
						</div>
					</div>
				)))}
			</div>
		</div>
	);
}
