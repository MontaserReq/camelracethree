// /app/api/results/[eventId]/getLoops/[loopId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
// تعطيل التخزين المؤقت وجعل الاستجابة ديناميكية
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string; loopId: string } }
) {
  const { eventId, loopId } = params;

  try {
    const results = await db.raceResult.findMany({
      where: {
        eventId: eventId,
        loopId: loopId,
      },
      include: {
        camel: true,
      },
    });

    const formattedResults = results.map((result) => ({
      rank: result.rank,
      camelId: result.camel.id,
      camelName: result.camel.name,
      ownerName: result.ownerName,
    }));

    return NextResponse.json(formattedResults, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
