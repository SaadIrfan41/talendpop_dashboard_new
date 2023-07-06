import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  // console.log(username, password);
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);
  try {
    const res = await fetch("http://18.237.25.116:8000/login", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.access_token) {
      cookies().set("talentPOP_token", data.access_token);
      return NextResponse.json({ data: data.access_token });
    }
    console.log(data);
    return NextResponse.json({ data: data });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message });
    } else {
      console.log("Unexpected error", err);
    }
  }
}
