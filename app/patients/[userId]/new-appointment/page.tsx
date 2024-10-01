"use client";

import { AppointmentForm } from "@/components/forms";
import { getPatient } from "@/lib/actions/patients.action";
import { SearchParamProps } from "@/types";
import { Patient } from "@/types/appwrite";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    getPatient(userId).then((data) => setPatient(data));
  }, [userId]);

  console.log({ patient });
  if (!patient) return null;
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="copyright mt-12">© 2024 CarePulse</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="appointment"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
