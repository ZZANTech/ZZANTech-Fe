import LogInContainer from "@/app/(auth)/login/_components/LogInContainer";
import MobileHeader from "@/components/MobileHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 로그인"
};

function LogIn() {
  return (
    <>
      <MobileHeader title="로그인" />
      <LogInContainer />
    </>
  );
}

export default LogIn;
