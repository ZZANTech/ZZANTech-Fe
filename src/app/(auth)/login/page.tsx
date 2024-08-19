import LogInContainer from "@/app/(auth)/login/_components/LogInContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZZAN | 로그인"
};

function LogIn() {
  return <LogInContainer />;
}

export default LogIn;
