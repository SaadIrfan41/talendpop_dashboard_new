"use client";
import React from "react";
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
import { registerFormSchema } from "@/lib/validations/register-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      // role: 'Team Lead',
    },
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" max-w-md ">
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
            <FormItem className=" max-w-md">
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className=" max-w-xs   ">
              {/* <FormLabel>Role</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="h-14  text-lg font-normal text-black/60 focus:ring-1 focus:ring-[#69C920]  focus:ring-offset-1 focus:ring-offset-[#69C920]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select your Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Team Lead">Team Lead</SelectItem>
                  <SelectItem value="Customer Success Manager">
                    Customer Success Manager
                  </SelectItem>
                  <SelectItem value="Customer Success Manager II">
                    Customer Success Manager II
                  </SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className=" bg-[#69C920] px-6 text-2xl " type="submit">
          Signup
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
