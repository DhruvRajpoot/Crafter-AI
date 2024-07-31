import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FormValues {
  prompt: string;
}

interface PromptFormProps {
  form: UseFormReturn<any>;
  isLoading: boolean;
  onSubmit: (data: any) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({
  form,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md z-10 rounded-lg">
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
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    disabled={isLoading}
                    placeholder="How to generate a random number in JavaScript?"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="col-span-12 lg:col-span-3 min-w-fit mr-14 sm:mr-16 lg:mr-10"
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PromptForm;
