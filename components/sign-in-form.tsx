"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { ArrowLeft, Loader2Icon } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(64)
})

type T_SignInForm = z.infer<typeof formSchema>

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  const searchParams = useSearchParams()

  const form = useForm<T_SignInForm>({
    resolver: zodResolver(formSchema), // client-side validation
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(input: T_SignInForm) {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      await authClient.signIn.email(
        {
          email: input.email,
          password: input.password,
          callbackURL: searchParams.get("callbackUrl") || "/",
          rememberMe: true
        },
        {
          onRequest: () => {
            // onRequest
          },
          onSuccess: () => {
            // onSuccess
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
        <Link href="/">
          <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>Enter your email below to sign in</CardDescription>
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
                      <Input {...field} type="email" disabled={form.formState.isSubmitting} required />
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
                      <Input {...field} type="password" disabled={form.formState.isSubmitting} required />
                    </FormControl>
                    <FormMessage />
                    <Link href="/" className="inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </Link>
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
              Sign in
            </Button>
          )}
          <p className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
