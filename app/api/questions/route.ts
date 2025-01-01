import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const questions = await prisma.question.findMany();
  return NextResponse.json(questions);
}

export async function POST(request: Request) {
  const { text } = await request.json();
  const newQuestion = await prisma.question.create({ data: { text } });
  return NextResponse.json(newQuestion);
}
