import connectMongoDB from "@/app/libs/mongoDB";
import Users from "../models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const user = await Users.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
}

export async function POST(request, { params }) {
  const { id } = params;
  const { name, email, phone_no} = await request.json();
  await connectMongoDB();
  await Users.findByIdAndUpdate(id, { name, email, phone_no });
  return NextResponse.json(
    { message: "User updated successfully" },
    { status: 200 }
  );
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  await Users.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 }
  );
}
