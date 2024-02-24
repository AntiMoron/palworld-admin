import { getGroups } from "@/util/group";

export async function GET() {
  try {
    const groups = await getGroups();
    return Response.json(groups);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "error" });
  }
}
