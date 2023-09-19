import type { GetServerSideProps, NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useStore from "../client/store";
import { IUser } from "../client/lib/types";
import { trpc } from "../client/utils/trpc";
import Layout from "~/client/components/layout/Layout";
import Card from "~/client/components/card";
import React from "react";
import { LoginInput, EmailInput } from "../client/lib/types";
import { checkEmailSchema, loginSchema } from "../client/lib/schema/user";
import LoginComponent from "../client/components/loginComponent";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const store = useStore();
  const [existingEmail, setExistingEmail] = React.useState(false); // Check if email exists

  const query = trpc.getMe.useQuery(undefined, {
    enabled: false,
    onSuccess: (data) => {
      store.setAuthUser(data.data.user as unknown as IUser);
    },
  });

  const { isLoading, mutate: loginUser } = trpc.loginUser.useMutation({
    onSuccess(data) {
      toast("Logged in successfully", {
        type: "success",
        position: "top-right",
      });
      query.refetch();
      router.push("/");
    },
    onError(error) {
      toast(error.message, {
        type: "error",
        position: "top-right",
      });
    },
  });

  const { mutate: checkLogin } = trpc.checkLogin.useMutation({
    onSuccess(data) {
      setExistingEmail(true);
    },
    onError(error) {
      store.setEmail(checkEmailMethod.getValues().email);
      router.push("/register");
    },
  });

  const loginMethods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const checkEmailMethod = useForm<EmailInput>({
    resolver: zodResolver(checkEmailSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = loginMethods;

  const {
    handleSubmit: handleEmailSubmit,
    formState: { isSubmitSuccessful: isEmailSubmitSuccessful },
  } = checkEmailMethod;

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    const loginValues = {
      ...values,
      password: loginMethods.getValues().password,
    };

    loginUser(loginValues);
  };
  const onEmailSubmitHandler: SubmitHandler<EmailInput> = (values) => {
    // Confirm email existence
    checkLogin(values);
  };
  return (
    <Layout>
      <Card>
        <div className="flex flex-col gap-[25px]">
          {!existingEmail ? (
            <>
              <LoginComponent
                message={"Enter your email to join us or sign in."}
                email={true}
                method={checkEmailMethod}
                submithandler={handleEmailSubmit}
                onSubmitHanlder={onEmailSubmitHandler}
                isLoading={isLoading}
              />
            </>
          ) : (
            <>
              <LoginComponent
                message={"Sign in"}
                email={false}
                emailValue={checkEmailMethod.getValues().email}
                method={loginMethods}
                submithandler={handleSubmit}
                onSubmitHanlder={onSubmitHandler}
                isLoading={isLoading}
                edit={() => setExistingEmail(!existingEmail)}
              />
            </>
          )}
        </div>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      requireAuth: false,
      enableAuth: false,
    },
  };
};

export default LoginPage;
