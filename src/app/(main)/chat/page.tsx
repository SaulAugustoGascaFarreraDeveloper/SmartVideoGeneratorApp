"use client"
import {useEffect, useState} from 'react'
import axios from "axios"
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { ChatFormSchema, ScrapeFormSchema } from '@/lib/schemas'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { string } from 'zod'
import { cn } from '@/lib/utils'


interface Message{
  role: "user" | "bot"
  content: string
}


const ChatPage = ({role,content} : Message) => {

  const [urlResponse,setUrlResponse] = useState<string>("")
  const [messages,setMessages] = useState<Message[]>([])

  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [urlProcessedSuccesfull,setUrlProcessedSuccesfull] = useState<boolean>(false)

  const [testValue,setTestValue] = useState<string>("")


  const scrapeForm = useForm({
    resolver: zodResolver(ScrapeFormSchema)
  })

  const chatForm = useForm({
    resolver: zodResolver(ChatFormSchema)
  })

  useEffect(() => {
    setUrlProcessedSuccesfull(false)
    setUrlResponse('')
    setMessages([])
  },[])

  const handleFastApiData = async () => {

    try{

      const response = await axios.get('/api/hello')

      setTestValue(response.data.message)

      return response.data

    }catch(error)
    {
      console.log(error)
    }

  }


  const onScrapeSubmit = async (data: any) => {

    setIsLoading(true)

    try{

    

      //console.log("Sending URL:", data.url);
      const endpoint = `/api/scrape`;
      
      const response = await axios.post(endpoint,{url: data.url})

      console.log(response.data)

      setUrlResponse("URL procesada con exito. Inicia tu Conversacion.");

      setUrlProcessedSuccesfull(true)

      return response.data

    }catch(error)
    {
      console.log(error)

      setUrlResponse("Fallo al procesar tu URL");
      setUrlProcessedSuccesfull(false)

    }finally{

      setIsLoading(false)

    }

  }


  const onChatSubmit = async (data: any) => {

    setIsLoading(true)

    try{

      const endpoint = "/api/chat"

      const response = await axios.post(endpoint,{message: data.message})

      console.log(response.data)

      setMessages([
        ...messages,
        {role: "user", content: data.message},
        {role: 'bot',content: response.data}
      ])

      return response.data

    }catch(error)
    {

      console.log(error)



    }finally{
      setIsLoading(false)
      chatForm.reset()
    }

  }

  return (
    <div className='overflow-hidden'>
      <div className='px-4 lg:px-8 mt-7 '>
            <Form {...scrapeForm} >
              <form
                onSubmit={scrapeForm.handleSubmit(onScrapeSubmit)}
                className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
              >
                <FormField 

                  name="url"
                  render={({field}) => (
                    <FormItem className='col-span-12 lg:col-span-10'>
                      <FormControl className='m-0 p-0'>
                          <Input disabled={isLoading} {...field} placeholder='Enter URL to Scrape example http://example123.com' />
                      </FormControl>
                    </FormItem>
                  )}
                
                />


                <Button disabled={isLoading} className='col-span-12 lg:col-span-2 w-full' type='submit'>
                  Scrape URL
                </Button>

              </form>
            </Form>

            {urlResponse && <p className='mt-4 font-mono'>{urlResponse}</p>}


            {/*Chat Interaction Form*/}
            {urlProcessedSuccesfull && <div className='px-4 lg:px-8 mt-4'>
                <Form {...chatForm}>
                <form
                onSubmit={chatForm.handleSubmit(onChatSubmit)}
                className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
              >
                <FormField 

                  name="message"
                  render={({field}) => (
                    <FormItem className='col-span-12 lg:col-span-10'>
                      <FormControl className='m-0 p-0'>
                          <Input disabled={isLoading} {...field} placeholder='Type your message...' />
                      </FormControl>
                    </FormItem>
                  )}
                
                />


                <Button disabled={isLoading} className='col-span-12 lg:col-span-2 w-full' type='submit'>
                  Send Message
                </Button>

              </form>
                </Form>
            </div>}



            {isLoading && <div className='z-20 flex mt-10 w-full justify-center items-center'>
                    <h1 className='animate-pulse font-extrabold'>
                      PROCESANDO URL ...
                    </h1>
            </div>}

            {messages.length === 0 && null}

            <div className="flex flex-col-reverse gap-y-4 mt-2">
                  {messages.map((message,index) => (
                    <div key={index} className={cn("p-8 flex justify-start gap-x-8 rounded-md",
                      message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                    )}>
                        {message.role === 'user' ? "User:" : "Bot:"}
                        <p className='text-sm'>{message.content}</p>
                    </div>
                  ))}
            </div>

      </div>
    </div>
  )
}

export default ChatPage