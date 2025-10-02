"use client";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "@/libs/cookie";

import Input from "@/features/admin/components/shared/Input/Input";
import Button from "@/features/admin/components/shared/Button/Button";

import styles from "./Login.module.scss";
import { loginRequest } from "@/services/auth.service";

const Login = () => {
  const router = useRouter();

  const inputRefs = {
    username: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  // Login
  const login = async (event: FormEvent) => {
    event.preventDefault();
    const loginRaw = JSON.stringify({
      email: inputRefs.username.current?.value,
      rawPassword: inputRefs.password.current?.value,
    });

    const { status, data } = await loginRequest(loginRaw);

    if (status === 200) {
      setCookie("tokenAldora", data.accessToken);
      router.push("/admin/home");
    } else toast.error(data);

    router.push("/admin/home");
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <h1 className={styles.login__content__title}>Login</h1>

        <form className={styles.login__content__form} onSubmit={login}>
          <Input inputRef={inputRefs.username} label="Username" type="text" />
          <Input
            inputRef={inputRefs.password}
            label={"Parol"}
            type={"password"}
          />
          <Button type="submit" text={"Sign"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
