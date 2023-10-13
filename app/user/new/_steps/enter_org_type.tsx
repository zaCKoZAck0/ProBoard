"use client"
import { SquaredRadio } from "@/components/squared-radio";
import { RadioGroup } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";
import React, { useCallback } from "react";
import { useWizard } from "react-use-wizard";
import { FormField } from "@/components/ui/form";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { NextButton } from "./next_button";


export function EnterOrgType(){

    const { nextStep } = useWizard();
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const FormSchema = z.object({
        org: z.enum(['org', 'solo'])
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      });

      const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
          return params.toString()
        },
        [searchParams]
      )

      function onSubmit(data: z.infer<typeof FormSchema>) {
        router.push(pathname + '?' + createQueryString('org', data.org))
        nextStep();
  }

    return(
        <motion.form 
        {...form} 
        onSubmit={form.handleSubmit(onSubmit)} 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex flex-col items-center justify-center">
            <FormField
  control={form.control}
  name="org"
  render={({ field }) => (
    <>
        <RadioGroup onChange={field.onChange} label="Select your work style">
      <SquaredRadio description="Create Organization" value="org">
        <span className="font-semibold text-lg">I have a team</span>
      </SquaredRadio>
      <SquaredRadio description="You can still create or join Organization(s) later." value="solo">
        <span className="font-semibold text-lg">I work solo</span>
      </SquaredRadio>
    </RadioGroup>
    <NextButton disabled={!field.value} />
    </>
    )} />
    </motion.form>
    )
}