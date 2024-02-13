import z from "zod"

export const ScrapeFormSchema = z.object({
    url: z.string().url({message: "Please Enter a Valid Url"})
})

export const ChatFormSchema = z.object({
    message: z.string().min(1,{message:"Message is Required"})
})