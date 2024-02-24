import { getAllPlayers } from "@/util/player";
import { NextRequest } from "next/server";

/**
 * 获取所有人
 */
export async function GET(res: NextRequest) {
  try {
    const params = res.nextUrl.searchParams;
    const groupId = params.get("groupId") || "";
    const order = (params.get("order") || "desc") as "desc" | "asc";
    const orderBy = params.get("orderBy") || undefined;
    const ownerId = params.get("ownerId") || undefined;
    const isPlayer =
      params.get("isPlayer") === "true" ||
      (params.get("isPlayer") === "false" && false);
    return Response.json(
      await getAllPlayers({
        ownerId,
        groupId,
        order_by: orderBy as any,
        isPlayer,
        order,
      })
    );
  } catch (err) {
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}

/**
 * 添加某人
 */
export async function PUT() {
  try {
    return Response.json({ OK: true });
  } catch (err) {
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}

/**
 * ban 某个人
 */
export async function DELETE() {
  try {
    return Response.json({ OK: true });
  } catch (err) {
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}

/**
 * 解封某个人
 */
export async function POST() {
  try {
    return Response.json({ OK: true });
  } catch (err) {
    return Response.json({
      error: (err as Error)?.message || err,
    });
  }
}
