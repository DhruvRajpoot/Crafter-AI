"use client";

import Heading from "@/app/(dashboard)/heading";
import { MessageSquare } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { useAppContext } from "@/context/appContext";
import toast from "react-hot-toast";
import MarkdownRenderer from "@/components/markdownRender";
import * as animationData from "@/assets/conversation.json";
import PromptForm from "../../promptInput";

const ConversationPage = () => {
  const router = useRouter();
  const { handleProModal } = useAppContext();
  const [messages, setMessages] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseContent, setResponseContent] = useState<string>("");
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);
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

      const systemMessage = { role: "system", content: partialResponse };

      const saveConversation = async () => {
        try {
          await fetch("/api/conversation/save", {
            method: "POST",
            body: JSON.stringify({
              conversations: [...messages, userMessage, systemMessage],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("[Save Conversation Error]", error);
          toast.error("Failed to save conversation.");
        }
      };

      saveConversation();

      setMessages((currentMessages) => [...currentMessages, systemMessage]);

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
    const fetchMessages = async () => {
      try {
        setInitialLoading(true);
        const response = await fetch("/api/conversation/get");
        if (!response.ok) {
          const errorData = await response.json();
          const error = new Error(
            errorData.message || "An error occurred while fetching data."
          );
          (error as any).status = response.status;
          throw error;
        }
        const data = await response.json();
        setMessages(data);
        setShouldScroll(true);
      } catch (error: any) {
        console.error("[Get Conversations Error]", error);
        if (error?.status !== 404) {
          toast.error(
            error.message || "An error occurred while fetching data."
          );
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMessages();
  }, []);

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
                  "px-2 sm:px-8 py-5 w-full flex items-start gap-x-2 sm:gap-x-8 rounded-lg",
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

          {(messages.length === 0 || initialLoading) && !isLoading && (
            <Empty
              label="Start a conversation by entering a prompt below"
              animationData={animationData}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <PromptForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};

export default ConversationPage;
