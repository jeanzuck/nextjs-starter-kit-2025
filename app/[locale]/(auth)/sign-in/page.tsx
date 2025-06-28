import { SignInForm } from "@/components/sign-in-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-start justify-center p-6 lg:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  )
}
