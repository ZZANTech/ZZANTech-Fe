import React from "react";
import Button from "@/components/Button/ButtonCva";
import Image from "next/image";

const ExamplePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <Button>안녕</Button>
      <Button variant="white" size="small" textSize="small" className="border border-red-600">
        80x44 Button
      </Button>
      <Button variant="black" size="medium" textSize="medium">
        124x44 Button
      </Button>
      <Button variant="TrueBlack" size="large" textSize="large">
        320x56 Button
      </Button>
      <Button variant="yellow" size="xl" textSize="medium">
        212x76 Button
      </Button>
      <Button variant="main" size="large" textSize="medium" fullWidth={true}>
        Full Width Button
      </Button>
      <Button variant="main" size="medium" textSize="medium">
        <Image src="/icons/mypage/pencil_white.png" alt="example" width={20} height={20} className="mr-1" />
        Button with Icon
      </Button>
      <Button variant="main" size="large" textSize="medium">
        <Image src="/icons/mypage/pencil_white.png" alt="example" width={20} height={20} className="mr-2" />
        Button with Icon
      </Button>
      <Button variant="main" size="large" textSize="medium">
        Button with Icon
        <Image src="/icons/mypage/pencil_white.png" alt="example" width={20} height={20} className="ml-2" />
      </Button>
    </div>
  );
};

export default ExamplePage;
