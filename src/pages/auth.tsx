import LoginForm from "@/components/login-form";
import image from "@/assets/tiiamekb.jpg";
import { useAuth } from "@/stores/auth/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/loading";

export default function AuthPage() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  if (auth === undefined) {
    return <Loading />;
  }

  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <img
            src={image}
            alt="Authentication"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Online ta'lim
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Ta'lim kelajak pasportidir, chunki ertangi kunga tegishli bugun
              unga tayyorgarlik ko'rayotganlar."
            </p>
            <footer className="text-sm">Malcolm X</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Student Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Boshqaruv paneliga kirish uchun ID va parolingizni kiriting
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
