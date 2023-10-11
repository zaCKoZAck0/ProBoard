import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from '@/lib/icons'
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">OOPS...</h1>
          <p className="text-2xl">You took the wrong route.</p>
          <p className="font-mono text-neutral-500 my-2">You might wanna visit</p>
          <Link href="/board" className={cn(buttonVariants({variant:"secondary"}),"gap-1 hover:gap-2 transition-all")}>Dashboard <ArrowRightIcon size={15} /></Link>
    </div>
  );
}