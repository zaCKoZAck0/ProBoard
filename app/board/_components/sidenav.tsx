"use client"
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Bell, Wand2, ChevronRight} from "@/lib/icons";
import type { LucideIcon } from 'lucide-react';
import React, { useState } from "react";

export function SideNav() {
    const [extendNav, setExtendNav] = useState(false);

    const handleMouseEnter = () => {
        setExtendNav(true);
    };
    const handleMouseLeave = () => {
        setExtendNav(false);
    };

    return (
        <motion.nav
            className="h-screen fixed left-0 z-10"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ width: "5rem" }}
            animate={{ width: extendNav ? "15rem" : "5rem" }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="h-screen p-2 rounded-e-2xl shadow-lg text-lg font-bold bg-white border border-neutral-200"
                initial={{ width: "5rem" }}
                animate={{ width: extendNav ? "15rem" : "5rem" }}
                transition={{ duration: 0.3 }}
            >
                <NavItem extendNav={extendNav} title='Notifications' icon={Bell} expandable></NavItem>
                <NavItem extendNav={extendNav} title='Task Assistant' icon={Wand2}></NavItem>
            </motion.div>
        </motion.nav>
    );
}

function NavItem(props: { type?: string, extendNav: boolean, expandable?: boolean, children?: React.ReactNode, title: string, icon: LucideIcon }) {
    const Icon = props.icon;
    return (
        <Button variant="ghost" className="rounded-full w-full justify-between">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className='flex justify-start items-center'
            >
                <Icon size={25} />
            
                {props.extendNav && (
                    <motion.span
                        className="ml-2 bold text-lg whitespace-nowrap"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {props.title}
                    </motion.span>
                )}
            </motion.div>
            {
                props.extendNav && props.expandable && <motion.div
                    initial={{ opacity: 0, scale: "0%" }}
                    animate={{ opacity: 1, scale: "100%" }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronRight size={25} />
                </motion.div>
            }

            {/* Todo: Implement collapsible feature if it's expandable */}
        </Button>
    )
}
