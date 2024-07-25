"use client";

import Heading from "@/components/heading";
import { Code } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import MarkdownRenderer from "./markdownRender";
import { useAppContext } from "@/context/appContext";

const CodePage = () => {
  const router = useRouter();
  const { handleProModal } = useAppContext();
  const [messages, setMessages] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 403) {
        handleProModal();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using descriptive text"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-3"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0 px-3">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How to generate a random number in JavaScript?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <Empty label="Ready to create some code? Type your prompt above to get started!" />
          )}

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

                <MarkdownRenderer message={message} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
