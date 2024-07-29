"use client";

import Heading from "@/app/(dashboard)/heading";
import { VideoIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import { useAppContext } from "@/context/appContext";
import toast from "react-hot-toast";
import * as animationData from "@/assets/video.json";
import PromptForm from "../../promptInput";

const VideoPage = () => {
  const router = useRouter();
  const { handleProModal } = useAppContext();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);

      form.reset();
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 403) {
        handleProModal();
      } else {
        const message =
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again later.";

        toast.error(message);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="pr-2 flex-1 overflow-y-scroll custom-scrollbar">
        <Heading
          title="Video Generation"
          description="Generate video based on your prompts"
          icon={VideoIcon}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
        />

        <div className="space-y-4 mt-4">
          {video && (
            <video
              className="w-full aspect-auto mt-8 rounded-lg
             border p-2 lg:p-8"
              controls
            >
              <source src={video} />
            </video>
          )}

          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {!video && !isLoading && (
            <Empty
              label="Ready to create amazing videos? Type your prompt below to get started!"
              animationData={animationData}
            />
          )}
        </div>
      </div>

      <PromptForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
    </>
  );
};

export default VideoPage;
