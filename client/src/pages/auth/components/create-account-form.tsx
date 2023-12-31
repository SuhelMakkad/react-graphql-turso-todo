import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useJWTStore } from "@/common/store/jwt";
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

import { createAccount } from "@/common/api/auth";
import { userSchema, type UserSchema } from "@/utils/auth";
import { routes } from "@/utils/route";

const defaultValues: UserSchema = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const CreateUserForm = () => {
  const navigate = useNavigate();
  const setJWT = useJWTStore((state) => state.setJWT);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (values: UserSchema) => {
    setIsLoading(true);

    const jwt = await createAccount(values);
    if (jwt) {
      setJWT(jwt);
    } else {
      toast("Account exists", {
        description: "Please login to continue",
        action: {
          label: "Login",
          onClick: () => navigate(routes.login),
        },
      });
    }

    setIsLoading(false);
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
