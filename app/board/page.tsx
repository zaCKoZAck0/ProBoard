import {HoverCard} from './_components/hoverCard'
import {Chip} from "@nextui-org/react";
import {AICard} from './_components/ai-card';

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <section>
                <HoverCard className='max-w-sm' title={''} description={''} >
                    <div>
                    <AICard />
                    </div>    
                </HoverCard>
            </section>
        </div>
    )
}