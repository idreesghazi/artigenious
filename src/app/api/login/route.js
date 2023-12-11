import connectMongoDB from "@/app/lib/mongodb";
import Persona from "@/app/models/persona";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    await connectMongoDB();

    const { email, password } = await request.json();
    const persona = await Persona.findOne({ email });

    if (!persona) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, persona.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid password", success: false }, { status: 401 });
    }

    // Implement your logic for successful login here.
    // It might involve generating a token or a session.

    return NextResponse.json({ message: "Login successful", success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error", success: false }, { status: 500 });
  }
}
