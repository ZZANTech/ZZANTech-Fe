import SignUpContainer from "@/app/(auth)/signup/_components/SignUpContainer";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 회원가입"
};

function SignUp() {
  return <SignUpContainer />;
}

export default SignUp;
