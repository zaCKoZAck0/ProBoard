"use client"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { motion } from "framer-motion";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Next } from "@/lib/icons";
import { NextButton } from "./next_button";
import { useWizard } from "react-use-wizard";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function EnterOrgName(){
    const { nextStep } = useWizard();
    const FormSchema = z.object({
        name: z.string().min(2).max(54),
        // description: z.string(),
        // image: z.any()
        // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        // .refine(
        //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        //   "Only .jpg, .jpeg, .png and .webp formats are supported."
        // )
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      });
    const searchParams = useSearchParams()
    const org = searchParams.get('org')

    function onSubmit(data: z.infer<typeof FormSchema>) {
        nextStep();
  }

    return(
        <motion.form 
        {...form} 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col items-center justify-center">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
            <Label className="text-xs text-muted-foreground">
                Orgainzation Name
      <Input type="input" className="mt-1" value={field.value} onChange={field.onChange} placeholder="e.g. ProBoard" />
      </ Label>
      <NextButton disabled={!field.value} />
      </>
      )}
    />
        </ motion.form>
    )
}
