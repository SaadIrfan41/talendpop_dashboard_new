"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/lib/validations/register-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setloading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        username: values.email,
        password: values.password,
      }),
    });

    const { data } = await res.json();
    console.log(data);
    if (data.detail) {
      toast.error(data.detail);
      setloading(false);
      return;
    }
    router.push("/");

    // if (res.status === 401) {
    //   return { message: "Not authenticated" };
    // }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col  space-y-8 "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" mx-auto w-full max-w-md">
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input
                  className=" py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] "
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className=" mx-auto w-full max-w-md">
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input
                  type="password"
                  className=" py-6 placeholder:text-lg placeholder:font-normal focus-visible:ring-[#69C920] focus-visible:ring-offset-1 focus-visible:ring-offset-[#69C920] "
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={loading}
          asChild
          className=" mx-auto bg-[#69C920] px-6  text-2xl "
          type="submit"
        >
          {loading ? (
            <button>
              Loggin In
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </button>
          ) : (
            <button>Login</button>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
