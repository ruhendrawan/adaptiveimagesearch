import React from "react";
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <>
            <div className="flex flex-col gap-8 items-start">
                <h1 className="text-2xl font-bold">Loading</h1>
                <div className="flex flex-wrap gap-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>

            </div>
        </>
    );
}
