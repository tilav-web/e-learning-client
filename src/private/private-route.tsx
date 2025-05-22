import Loading from "@/components/loading";
import { useAuth } from "@/stores/auth/auth";
import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type Roles = "teacher" | "student";

interface IProps {
  children: ReactNode;
  roles: Roles[];
}

export default function PrivateRoute({ roles, children }: IProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth === undefined) {
    return <Loading />;
  }

  if (auth === null) {
    navigate("/");
    return null;
  }

  if (auth?.role && !roles.includes(auth?.role)) {
    return null;
  }

  return children;
}
