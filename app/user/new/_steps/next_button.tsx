import { Button } from "@/components/ui/button"
import { Next } from "@/lib/icons"
export function NextButton({disabled}:{disabled: boolean}){
    return(
        <>
        <Button 
    className="h-14 mt-4 w-14 text-neutral-300 hover:text-primary bg-transparent hover:bg-transparent" 
    variant='link' 
    size='icon'
    disabled={disabled}
    type="submit"
    >
        <Next size={50} />
    </Button>
    <div className="text-neutral-500">Next</div>
        </>
    )
}