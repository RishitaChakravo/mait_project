import dbConnect from "@/dbConnect/dbConnect";
import getDatafromToken from "@/getDatafromToken";
import Prescription from "@/models/prescriptionModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const userId = await getDatafromToken(token);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const prescriptions = await Prescription.aggregate([
      {
        $match: {
          patient: userId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "patient",
          foreignField: "_id",
          as: "patientDetails",
        },
      },
      {
        $unwind: {
          path: "$patientDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          symptoms: 1,
          disease: 1,
          cure: 1,
          createdAt: 1,
          "patientDetails.name": 1,
          "patientDetails.age": 1,
          "patientDetails.gender": 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    console.error("Internal Error: error while displaying patient prescription", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
