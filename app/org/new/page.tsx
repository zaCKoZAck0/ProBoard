import  CustomRadio from "@/components/newSelect"
export default function NewOrgPAge(){
    return(
        <main className="flex w-full h-screen">
            <div className="md:w-2/5 w-full flex flex-col items-center justify-center">
                    <CustomRadio />
            </div>
            <div className="w-3/5 hidden md:inline bg-neutral-300">

</div>
        </main>
    )
}