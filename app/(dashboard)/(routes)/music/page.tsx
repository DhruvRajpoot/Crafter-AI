"use client";

import Heading from "@/app/(dashboard)/heading";
import { Music } from "lucide-react";
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
import * as animation from "@/assets/music.json";
import PromptForm from "../../promptInput";

const MusicPage = () => {
  const router = useRouter();
  const { handleProModal } = useAppContext();
  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);

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
          title="Music Generation"
          description="Generate music based on your prompts"
          icon={Music}
          iconColor="text-pink-500"
          bgColor="bg-pink-500/10"
        />

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}

          {!music && !isLoading && (
            <Empty
              label="Let's create some beautiful music! Type your request below to begin"
              animationData={animation}
            />
          )}

          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>

      <PromptForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        placeholder="Compose a relaxing ambient track with gentle piano melodies and soothing strings."
      />
    </>
  );
};

export default MusicPage;
