"use client";

import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useAppContext } from "@/context/appContext";
import toast from "react-hot-toast";
import MarkdownRenderer from "@/components/markdownRender";

const ConversationPage = () => {
  const router = useRouter();
  const { handleProModal } = useAppContext();
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseContent, setResponseContent] = useState<string>("");
  const [shouldScroll, setShouldScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollTopRef = useRef<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const scrollToBottom = () => {
    if (shouldScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const scrollHeight = event.currentTarget.scrollHeight;
    const clientHeight = event.currentTarget.clientHeight;

    scrollTopRef.current = scrollTop;

    if (scrollTop + clientHeight < scrollHeight - 5) {
      setShouldScroll(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      setMessages((currentMessages) => [...currentMessages, userMessage]);

      setIsLoading(true);

      setShouldScroll(true);

      setResponseContent("");

      const response = await fetch("/api/conversation", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(
          errorData.message || "An error occurred while fetching data."
        );
        (error as any).status = response.status;
        throw error;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let partialResponse = "";

      while (true) {
        const { done, value } = (await reader?.read()) || {
          done: true,
          value: new Uint8Array(),
        };
        if (done) break;

        partialResponse += decoder.decode(value, { stream: true });

        setResponseContent(partialResponse);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "system", content: partialResponse },
      ]);

      form.reset();
    } catch (error: any) {
      if (error?.status === 403) {
        handleProModal();
      } else {
        const message =
          error.message || "Something went wrong. Please try again later.";

        toast.error(message);
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, responseContent, isLoading, shouldScroll]);

  return (
    <>
      <div className="pr-2 flex-1 overflow-y-scroll custom-scrollbar">
        <Heading
          title="Conversation"
          description="Generate text using AI"
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />

        <div className="space-y-4 mt-4" onScroll={handleScroll}>
          <div className="flex flex-col gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "px-8 py-5 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                {message.role === "user" ? (
                  <p className="my-auto">{message.content}</p>
                ) : (
                  <MarkdownRenderer message={message} />
                )}
              </div>
            ))}

            {isLoading && responseContent && (
              <div className="px-8 py-5 w-full flex items-start gap-x-8 rounded-lg bg-muted">
                <BotAvatar />
                <MarkdownRenderer message={{ content: responseContent }} />
              </div>
            )}
          </div>

          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <Empty label="Start a conversation by entering a prompt above" />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className=" bg-white border-b border-gray-200 shadow-md z-10 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-3"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-9">
                  <FormControl className="m-0 p-0 px-3">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Enter your prompt to generate text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-3 min-w-fit mr-14 sm:mr-16 lg:mr-10"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ConversationPage;
