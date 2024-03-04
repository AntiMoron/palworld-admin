import getSyncStats from "@/util/syncStats";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  try {
    const stats = getSyncStats();
    return Response.json({ stats });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
