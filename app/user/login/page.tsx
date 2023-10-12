"use client"
// Todo: Split into two components
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import {Github, Google, Mail, SendHorizonal} from "@/lib/icons";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const MailIcon = email?.length > 0? SendHorizonal: Mail;
    const FormSchema = z.object({
        email: z.string().email()
      })
    
        const form = useForm<z.infer<typeof FormSchema>>({
          resolver: zodResolver(FormSchema),
        });
    
    function onSubmit(data: z.infer<typeof FormSchema>) {
            //Todo: Implement Login
      }
    return(<main className="flex w-full h-screen">
        <div className="hidden md:flex bg-accent w-1/3">
        </div>
        <div className="flex flex-col items-center bg-neutral-50 justify-center w-full md:w-2/3">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-sm shadow p-4 w-full rounded-xl bg-white">
            <h1 className="text-2xl font-semibold m-2 mt-0 w-fit font-mono border-b-2 border-purple-500">
                Login to ProBoard
            </h1>
            <div>
                <Button className="big-btn bg-white hover:bg-neutral-100 text-gray-900">
                    <Github size={20} /> Continue wtih Github
                </Button>
                <Button className="big-btn bg-gray-900 hover:bg-gray-800 text-white">
                    <Google size={20} /> Continue with Google
                </Button>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center text-neutral-300 text-sm dark:text-white">
              Or
            </p>
          </div>
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
          <FormItem>
          <FormLabel className='text-neutral-500'>Continue with Email</FormLabel>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <FormControl>
      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      </FormControl>
      <Button className="transition-all duration-300" variant='default' type="submit"><MailIcon /></Button>
    </div>
    </FormItem>)}
    />
            </div>
            </form>
            </Form>
        </div>
    </main>
    )
}