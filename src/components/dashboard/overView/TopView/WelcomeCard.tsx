"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/authContext";
import Image from "next/image";

import WelcomeBackImage from "@/assets/gift-box-3.png";

const WelcomeCard = () => {
  const { user } = useAuth();

  return (
    <Card className="flex flex-col justify-center bg-gradient-to-r from-green-400 to-blue-300">
      <CardHeader>
        <CardTitle>Welcome Back, {user?.name} 👋</CardTitle>
        <CardDescription>
          You can manage your products, orders, and blog from this dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">
          Warning: Performing any create, read, update, or delete (CRUD)
          operation may permanently alter or remove data. Ensure all actions are
          intentional and accurate to avoid unintended changes or loss of
          information.
        </p>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <Link href={"/dashboard/orders"}>
            <Button size={"default"} className="rounded-full">
              See All Orders
            </Button>
          </Link>
          <Image src={WelcomeBackImage} alt="" className="w-[100px]" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default WelcomeCard;
