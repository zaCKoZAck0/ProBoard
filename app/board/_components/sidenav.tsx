"use client"
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Bell, Wand2, ChevronRight, LayoutDashboard, Search } from "@/lib/icons";
import type { LucideIcon } from 'lucide-react';
import React, { useState } from "react";
import { Notifications } from './notifications';
import { Separator } from "@/components/ui/separator"
import {Avatar} from "@nextui-org/react";
import Link from 'next/link';

export function SideNav() {
    const [extendNav, setExtendNav] = useState(false);

    const selectedNav = "dashboard";

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
                className="h-screen p-2 rounded-e-2xl flex flex-col justify-between shadow-lg bg-white border border-neutral-200"
                initial={{ width: "5rem" }}
                animate={{ width: extendNav ? "15rem" : "5rem" }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    transition={{
                        duration: 0.3
                    }}
                >
                    <NavItem extendNav={extendNav} title='Notifications' icon={Bell} >
                        <Notifications />
                    </NavItem>
                    <NavItem extendNav={extendNav} title='Task Assistant' icon={Wand2}></NavItem>
                    <NavItem extendNav={extendNav} title='Dashboard' icon={LayoutDashboard} selected={selectedNav === 'dashboard'}></NavItem>
                    <NavItem extendNav={extendNav} title={<div className='flex items-center'>Search<span className='text-sm bg-neutral-100 rounded-xl font-mono ml-2 py-1 px-2'>Ctrl + F</span></div>} icon={Search} />
                </motion.div>
                <div>
                    <Separator className='my-1' />
                    <motion.div
                        transition={{
                            duration: 0.3
                        }}
                        className='flex items-center justify-right gap-2'
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className='flex justify-start items-center'
                        >
                            <Avatar className='w-10 h-10' src='https://avatars.githubusercontent.com/u/69889382?v=4' />
                        </motion.div>
                        {extendNav && <div>
                            <Link href="#" className='text-sm text-gray-600 font-bold'>
                                @zackozack0
                            </Link>
                            <div className='text-xs text-neutral-500'>
                                Author
                            </div>
                        </div>}
                    </motion.div>
                </div>
                
            </motion.div>
        </motion.nav>
    );
}

function NavItem(props: { type?: string, selected?: boolean, extendNav: boolean, children?: React.ReactNode, title: React.ReactNode, icon: LucideIcon }) {
    const Icon = props.icon;
    const expandable = !!props.children;
    const [expanded, setExpanded] = useState(false);
    function handleClick() {
        expandable && setExpanded((prev) => (!prev));
    }
    const variant = (expanded || props.selected) ? "selected" : "ghost";
    return (
        <>
            <Button variant={variant} className="rounded-full w-full justify-between my-1" onClick={handleClick}>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className='flex justify-start items-center'
                >
                    <Icon size={25} />
            
                    {props.extendNav && (
                        <motion.span
                            className="ml-2 text-lg whitespace-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            {props.title}
                        </motion.span>
                    )}
                </motion.div>
                {
                    props.extendNav && expandable && <motion.div
                        initial={{ opacity: 0, scale: "0%" }}
                        animate={{ opacity: 1, scale: "100%" }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronRight
                            className={expanded ? "rotate-90" : "rotate-0 transition-transform"}
                            size={25} />
                    </motion.div>
                }
            </Button>
            {
                expandable && expanded && props.extendNav && props.children
            }
        </>
    )
}
