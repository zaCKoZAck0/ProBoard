import { Wand2 } from "@/lib/icons";
import { Button } from "@/components/ui/button";
export function AICard(){
    return(
    <Button className="text-white rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30">
        <Wand2 size={17} className="mr-2" />AI
    </Button>
    )
}