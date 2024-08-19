import SignUpContainer from "@/app/(auth)/signup/_components/SignUpContainer";
import React from "react";
import { Metadata } from "next";
import MobileHeader from "@/components/MobileHeader";

export const metadata: Metadata = {
  title: "ZZAN | 회원가입"
};

function SignUp() {
  return (
    <>
      <MobileHeader title="회원가입" />
      <SignUpContainer />
    </>
  );
}

export default SignUp;
