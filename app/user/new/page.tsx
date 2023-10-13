"use client"
import { Button } from "@/components/ui/button"
import { Next, Previous } from "@/lib/icons"
import {usePagination, PaginationItemType, cn} from "@nextui-org/react";
import {Avatar, AvatarGroup} from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { Wizard } from 'react-use-wizard';
import { EnterOrgDesc } from "./_steps/enter_org_desc";
import { EnterOrgName } from "./_steps/enter_org_name";
import { EnterOrgType } from "./_steps/enter_org_type";
import { useState } from "react";
import { CreatingOrg } from "./_steps/creating_org";
import { UploadOrgLogo } from "./_steps/upload_org_logo";

type state = {
    org?: 'solo' | 'org',
    orgDetails?: {
        name: string,
    }
    
}

export default function NewOrgPAge() {
    const [state, setState] = useState()
    const { activePage, range, setPage, onNext, onPrevious } = usePagination({
        total: 4,
        siblings: 4,
        boundaries: 4,
    });
    return (
        <main className="flex w-full h-screen">
            <div className="md:w-2/5 w-full  flex flex-col items-center justify-center">
            
                <Wizard
                wrapper={
                      <AnimatePresence mode="wait" />
                  }
                >
                    <EnterOrgType />
                    <EnterOrgName />
                    <EnterOrgDesc />
                    <UploadOrgLogo />
                    <CreatingOrg />
                </Wizard>
            </div>
            <div className="w-3/5 hidden md:inline relative bg-neutral-100">
            <h1 className="text-2xl font-semibold m-2 fixed top-0 w-fit font-mono border-b-2 border-purple-500">
                Few things before we start
            </h1>
            </div>
        </main>
    )
}