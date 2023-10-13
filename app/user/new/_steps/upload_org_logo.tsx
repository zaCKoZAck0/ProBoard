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
import { Image, ImagePlus } from "@/lib/icons";
import { NextButton } from "./next_button";
import { useWizard } from "react-use-wizard";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function UploadOrgLogo(){
    const { nextStep } = useWizard();
    const FormSchema = z.object({
        // name: z.string().min(2).max(54),
        // description: z.string(),
        image: z.any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      });
    const searchParams = useSearchParams()
    const org = searchParams.get('org')

    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log(data.image.src)
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
          name="image"
          render={({ field }) => (
            <>
             <div
        className={`w-48 h-48 rounded-xl bg-${
          !!field.value ? `cover bg-center` : "accent"
        } flex flex-col items-center justify-center cursor-pointer bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: !!field.value ? `url(${field.value})` : "none" }}
      >
        {!field.value && (
          <>
            <ImagePlus className="text-primary" size={25} />
            <div className="text-primary font-semibold">+ Upload Image</div>
          </>
        )}
        {
        !!field.value && <div className="w-48 h-48 rounded-xl absolute bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
            <Image size={25} />
            <div className="font-semibold">Change Image</div>
        </div>
      }
      </div>
      <input
        className="bg-transparent outline-none file:hidden text-transparent w-48 h-48 absolute cursor-pointer"
        title="Profile Picture"
        accept=".jpeg, .jpg, .png"
        onChange={field.onChange}
        value={field.value}
        aria-label="image upload"
        type="file"
      />
      <NextButton disabled={!field.value} />
      </>
      )}
    />
        </ motion.form>
    )
}
