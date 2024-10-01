import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { CreateAppointmentParams } from "@/types";
import { parseStringify } from "../utils";

export const createAppointment = async (data: CreateAppointmentParams) => {
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      data
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
