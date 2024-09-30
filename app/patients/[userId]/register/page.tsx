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
      <section className="remove-scrollbar container">
        <div className="sub-container  max-w-[860px] flex-1 flex-col py-10 pb-2">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          {user && <RegisterForm user={user} />}
          <p className="copyright py-12">© 2024 CarePulse</p>
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
