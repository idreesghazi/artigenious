import connectMongoDB from "@/app/lib/mongodb";
import Persona from "@/app/models/persona";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, dob } = await request.json();

    console.log("Request body: ", request.body);


    const user = await Persona.findOne({ email }); // Use await to get the result
    console.log("User: ", user);
    if (user) { // Check if user is truthy (found)
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }

    await connectMongoDB();
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Persona.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      { message: "Persona created successfully", success: true, savedUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error, success: false },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const personas = await Persona.find();
  return NextResponse.json({ personas });
}

export async function DELETE(request) {
  const { id } = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Persona.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Persona deleted successfully" },
    { status: 201 }
  );
}
