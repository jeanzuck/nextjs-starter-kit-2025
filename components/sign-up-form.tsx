"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Loader2Icon } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useForm } from "react-hook-form"
import * as z from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "@/i18n/navigation"

const formSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8).max(64),
    confirmPassword: z.string().min(8).max(64)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })

type T_SignUpForm = z.infer<typeof formSchema>

export function SignUpForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const form = useForm<T_SignUpForm>({
    resolver: zodResolver(formSchema), // client-side validation
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  async function onSubmit(input: T_SignUpForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await authClient.signUp.email(
        {
          email: input.email,
          password: input.password,
          name: "", // user display name
          callbackURL: "/"
        },
        {
          onRequest: () => {
            // onRequest
          },
          onSuccess: () => {
            // onSuccess
            router.push("/")
          },
          onError: (ctx) => {
            form.setError("root", {
              message: ctx.error.message
            })
          }
        }
      )
    } catch (error) {
      console.error(error)
      form.setError("root", {
        message: error instanceof Error ? error.message : "Something went wrong, please try again"
      })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex justify-start">
        <Link href="/sign-in">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Sign in
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <CardContent>
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
                        {...field}
                        type="email"
                        placeholder="john@example.com"
                        disabled={form.formState.isSubmitting}
                        required
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
                      <Input
                        {...field}
                        type="password"
                        placeholder="Create a strong password"
                        disabled={form.formState.isSubmitting}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                        disabled={form.formState.isSubmitting}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {form.formState.errors?.root && (
            <p className="w-full text-sm text-red-600">{form.formState.errors.root?.message}</p>
          )}
          {form.formState.isSubmitting ? (
            <Button className="w-full" disabled>
              <Loader2Icon className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
              Create account
            </Button>
          )}
          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
