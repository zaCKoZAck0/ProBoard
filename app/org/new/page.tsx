"use client"
import CustomRadio from "@/components/newSelect"
import { Button } from "@/components/ui/button"
import { Next, Previous } from "@/lib/icons"
import {usePagination, PaginationItemType, cn} from "@nextui-org/react";


export default function NewOrgPAge() {
    const { activePage, range, setPage, onNext, onPrevious } = usePagination({
        total: 4,
        siblings: 4,
        boundaries: 4,
    });
    return (
        <main className="flex w-full h-screen">
            <div className="md:w-2/5 w-full relative flex flex-col items-center justify-center">
                <CustomRadio />
                <Button className="h-14 mt-4 w-14 text-neutral-300 hover:text-primary bg-transparent hover:bg-transparent" variant='link' size='icon'>
                    <Next size={50} />
                </Button>
                <div className="text-neutral-500">Next</div>
            </div>
            <div className="w-3/5 hidden md:inline bg-neutral-200">

            </div>
        </main>
    )
}