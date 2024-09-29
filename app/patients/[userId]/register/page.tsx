"use client";

import { RegisterForm } from "@/components/forms";
import { getUser } from "@/lib/actions/patients.action";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Register = () => {
  const { userId }: { userId: string } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then((data) => setUser(data));
  }, [userId]);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <div className=" overflow-y-auto h-[calc(100vh-300px)] remove-scrollbar">
            {user && <RegisterForm user={user} />}
          </div>
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>
            <Link href="/?adim=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
