import connectMongoDB from "@/app/libs/mongoDB";
import Users from "../models/user";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json({ users }, { status: 200 });
}

export async function POST(request) {
  const { name, email, phone_no } = await request.json();
  await connectMongoDB();
  await Users.create({ name, email, phone_no });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}
