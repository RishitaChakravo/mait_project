import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Prescription from "@/models/prescriptionModel";
import getDatafromToken from "@/getDatafromToken";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { symptoms, disease, cure } = await request.json();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = await getDatafromToken(token);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    if (!symptoms?.length || !disease?.length || !cure?.trim()) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const prescription = await Prescription.create({
      symptoms,
      disease,
      cure,
      patient: userId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Prescription created and saved successfully",
        prescription,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal issue: Error while creating prescription", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while prescription creation",
      },
      { status: 500 }
    );
  }
}
