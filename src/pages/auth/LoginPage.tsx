import { LoginForm } from '@/components/shared/LoginForm'
import { Toaster } from '@/components/ui/toaster'

const LoginPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
      <Toaster />
    </div>
  )
}

export default LoginPage