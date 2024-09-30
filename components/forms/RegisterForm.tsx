"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { FormFieldType } from "./PatientForm";
import { RegisterUserParams, User } from "@/types";
import { SelectItem } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { useRouter } from "next/navigation";
import { registerPatient } from "@/lib/actions/patients.action";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: { ...PatientFormDefaultValues, ...user },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData: RegisterUserParams = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.debug(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome! 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            control={form.control}
          />
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email"
              placeholder="JohnDoe@example.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone Number"
              placeholder="1234567890"
              control={form.control}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              name="birthDate"
              label="Birth Date"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              name="gender"
              label="Gender"
              control={form.control}
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          className="cursor-pointer capitalize"
                          htmlFor={option}
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="address"
              label="Address"
              placeholder="14th Street,Narnia"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Part-time Villain"
              control={form.control}
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Bruce Wayne"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="1234567890"
              control={form.control}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            label="Primary Care Physician"
            placeholder="Select a physician"
            control={form.control}
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    height={32}
                    alt={doctor.name}
                    width={32}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="Vought Industries"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="XYZ123434"
              control={form.control}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Posion"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Vicodin, Paracetamol"
              control={form.control}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Father had diabetes"
              control={form.control}
            />
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="Broken Heart"
              control={form.control}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification & Verification</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an Identification type"
            control={form.control}
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                <p>{type}</p>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            name="identificationNumber"
            label="Identification Number"
            placeholder="1234566778"
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="identificationDocument"
            label="Scanned copy of identification document"
            control={form.control}
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value ?? []}
                  onChange={field.onChange}
                />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
