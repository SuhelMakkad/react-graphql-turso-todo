"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import { authenticate } from "@/common/api/auth";
import { useNavigate } from "react-router-dom";
import { routes } from "@/utils/route";
import { useJWTStore } from "@/common/store/jwt";

const defaultValues: Credentials = {
  email: "",
  password: "",
};

const UserLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setJWT = useJWTStore((state) => state.setJWT);
  const navigate = useNavigate();

  const form = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    defaultValues,
  });

  const onSubmit = async (values: Credentials) => {
    console.log(values);
    setIsLoading(true);
    const jwt = await authenticate(values.email, values.password);

    if (jwt) {
      navigate(routes.home);
      setJWT(jwt);
    } else {
      toast("Wrong credentials", {
        description: "Please verify your email and password",
      });
    }

    setIsLoading(false);
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
