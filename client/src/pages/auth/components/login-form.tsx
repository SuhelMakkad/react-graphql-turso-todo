"use client";

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

import { credentialsSchema, type Credentials } from "@/utils/auth";

const defaultValues: Credentials = {
  email: "",
  password: "",
};

export type UserLoginFormProps = {
  nextPath?: string;
};

const UserLoginForm = ({ nextPath }: UserLoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues,
  });

  const onSubmit = async (values: Credentials) => {
    console.log(values);
    setIsLoading(true);
    // const res = await authenticate(values);

    setIsLoading(false);

    // if (res && res.status === "success") {
    //   router.replace(nextPath ? nextPath : routes.dashboard(res.user.id));
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: res?.message || "Uh oh! Wrong credentials.",
    //     description: "Please verify your email and password again.",
    //   });
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoFocus
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
            <FormItem>
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

        <Button className="mt-2 w-full" type="submit" disabled={isLoading}>
          Sign in
          {isLoading && <Loader2 className="ml-2 animate-spin" width={16} />}
        </Button>
      </form>
    </Form>
  );
};

export default UserLoginForm;
