import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import instance from "@/lib/axios";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  usercode: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function SignIn() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usercode: "",
      password: "",
    },
  });
  const {
    formState: { errors },
    setError,
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await instance.post("/signin", values);
      const respdata = await resp.data;
      console.log(respdata);
      // setUser(respdata);

      sessionStorage.setItem("token", respdata.token);
      sessionStorage.setItem("user", JSON.stringify(respdata.user));
      if (respdata.isadmin) {
        return navigate("/dashboard/admin");
      }
      navigate("/dashboard/employee");
    } catch (error) {
      console.log("some thing worng", error);
      setError("root", {
        message: "some thing went worng",
      });
    }
  }
  return (
    <div className=" h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="usercode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
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
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errors.root && (
                <p className=" text-sm text-red-800">some thing went wrong</p>
              )}
              <Button type="submit" className="w-full bg-amber-600">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
