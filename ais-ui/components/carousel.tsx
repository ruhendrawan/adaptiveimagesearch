import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/react";

export default function Carousel({ title, items }: { title: string, items: any }) {
	return (
		<div className="flex flex-col gap-2">
			{title ? <h2 className="text-sm font-bold">{title}</h2> : null}
			<div className="flex items-start gap-4">
				{ items.isLoading && <Skeleton className="rounded-lg"><div className="w-64 h-40 rounded-lg bg-default-300"></div></Skeleton>}
				{ items.data && Array.isArray(items.data.urls) && (items.data.urls.map((item: any) => item.file && (
					<div key={item.file} className="w-64 h-40 flex flex-col gap-2 items-center justify-center">
						<Image src={`/images/${title}/${item.file}`} alt={item.origin} width={400} height={300} className="h-40 w-full object-cover"/>
						<Button size="sm" color="secondary">Select</Button>
					</div>
				)))}
			</div>
		</div>
	);
}
