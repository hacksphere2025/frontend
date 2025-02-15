import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { JSX } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/api/App";
import { useSessionStore } from "@/store/sessionStore";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useUser } from "@/provider/userProvider/App";
import { LoginType, User } from "@/types/User";

export default function SiginInModal({
  signInDialogState,
  setSignInDialogState,
}: {
  signInDialogState: boolean;
  setSignInDialogState: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { setUser, setSession } = useUser();
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email({
      message: "Email must be valid",
    }),
    password: z.string().min(4, {
      message: "Enter a valid password",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("hello");
    try {
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status == 200) {
        useSessionStore.setState({ token: response.data.data.token });
        await fetchUserDetail();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status == 402) {
        form.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
        return;
      }
      if (axios.isAxiosError(error) && error.response?.status == 403) {
        form.setError("password", {
          type: "manual",
          message: "User not found. Please signup.",
        });
        return;
      }
      form.setError("password", {
        type: "manual",
        message: "Internal Server Error",
      });
      console.log(error);
    }
  };

  const getCurrentUserSesssionDetails = async () => {
    try {
      const response = await api.get("/session");
      if (response.status == 200) {
        setSession([...response.data.data]);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetail = async () => {
    try {
      const userData = await api.get("/user");
      if (userData.status == 200) {
        const payload = userData.data;
        const user: User = {
          userName: payload.data.name,
          email: payload.data.email,
          phoneNo: payload.data.phone_no,
          id: payload.data._id,
          loginType:
            payload.data.userType == "user"
              ? LoginType.Buyer
              : LoginType.Seller,
          session: [],
        };
        await getCurrentUserSesssionDetails();
        setUser(user);
        setSignInDialogState(false);
        toast({
          title: "Sucess",
          description: "Sucessfully signed in to your account.",
        });
      } else {
        throw Error("User not fetched sucessfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog open={signInDialogState} onOpenChange={setSignInDialogState}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Sign In</DialogTitle>
          <DialogDescription className="text-gray-600">
            Enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-50% font-medium py-2 rounded-md transition-all"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
