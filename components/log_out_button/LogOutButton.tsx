"use client";
import { signOut } from "next-auth/react";
import Button from "../button/button";

export default function LogOutButton() {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })} size="md">
      Cerrar sesión
    </Button>
  );
}
