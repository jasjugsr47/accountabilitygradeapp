import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { questionId, score } = await request.json();
  const grade = await prisma.grade.create({
    data: { questionId, score },
  });
  return NextResponse.json(grade);
}

export async function GET() {
    const grades = await prisma.grade.findMany({
      include: { question: true }, // Fetch related question details
    });
    return NextResponse.json(grades);
  }
  
