import { SignUpForm } from "@/components/sign-up-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-start justify-center p-6 lg:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
