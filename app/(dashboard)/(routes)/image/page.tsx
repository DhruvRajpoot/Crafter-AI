"use client";

import Heading from "@/app/(dashboard)/heading";
import { Download, ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader";
import Empty from "@/components/empty";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useAppContext } from "@/context/appContext";
import toast from "react-hot-toast";
import * as animationData from "@/assets/image.json";
import PromptForm from "../../promptInput";

const ImagePage = () => {
  const router = useRouter();
  const { handleProModal } = useAppContext();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image", values);

      const urls = response.data.map((image: { url: string }) => image.url);

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
          title="Image Generation"
          description="Generate image from text prompt"
          icon={ImageIcon}
          iconColor="text-blue-500"
          bgColor="bg-blue-500/10"
        />

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty
              label="Create beautiful visuals! Type your request below to begin"
              animationData={animationData}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src, index) => (
              <Card key={index} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={src} alt="Generated Image" fill />
                </div>
                <CardFooter className="p-2">
                  <Button
                    className="w-full"
                    variant={"secondary"}
                    onClick={() => window.open(src, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <PromptForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        placeholder="Create a serene landscape with rolling hills, a sunset sky, and a calm lake."
      />
    </>
  );
};

export default ImagePage;
