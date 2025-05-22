import type { AxiosError } from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { authService } from "@/services/auth.service";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/stores/auth/auth";
import { toastError } from "@/common/utils/toast-actions";

export default function LoginForm() {
  const { login } = useAuth();
  const [uid, setUid] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!uid || !password) {
        return toastError("ID va PASSWORD kiritilishi kerak!");
      }
      const data = await authService.login({ uid, password });
      login(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err.response?.data?.message ?? "Nomaʼlum xatolik yuz berdi";

      toastError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Label className="flex flex-col items-start">
        <span className="text-sm p-0">Login</span>
        <Input
          onChange={(e) => setUid(e.target.value)}
          placeholder="Identifikatsiya"
        />
      </Label>
      <Label className="flex flex-col items-start">
        <span className="text-sm p-0">Password</span>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
        />
      </Label>
      <Button type="submit" className="font-bold">
        Kirish
      </Button>
    </form>
  );
}
