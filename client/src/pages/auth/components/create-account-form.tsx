import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { UserSchema, userSchema } from "@/utils/auth";

const defaultValues: UserSchema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const CreateUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (values: UserSchema) => {
    // setIsLoading(true);
    // const res = await createAccount(values);
    // setIsLoading(false);
    // if (res && res.status === "success") {
    //   router.replace(routes.dashboard(res.user.id));
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: res?.message || "Uh oh! something went wrong.",
    //     description: "Please verify all the input fields.",
    //   });
    // }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-2 flex flex-col gap-4 md:grid"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  type="password"
                  placeholder="Your account password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="col-span-2 mt-2 w-full"
          type="submit"
          disabled={isLoading}
        >
          Sign in
          {isLoading && <Loader2 className="ml-2 animate-spin" width={16} />}
        </Button>
      </form>
    </Form>
  );
};

export default CreateUserForm;
