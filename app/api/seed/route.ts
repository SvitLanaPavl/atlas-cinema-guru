import * as seed from "@/lib/seed";

/**
 * Exposes an API endpoint `GET /api/seed`. When hit, runs the commands against the database to create tables and load data.
 */
/*export async function GET() {
  try {
    await seed.begin();
    await seed.seedTitles();
    await seed.seedFavorites();
    await seed.seedWatchLater();
    await seed.seedActivity();
    await seed.commit();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await seed.rollback();
    return Response.json({ error }, { status: 500 });
  }
}*/
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { titles } from "@/seed/titles";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db
      .insertInto("titles")
      .values(titles)
      .onConflict((oc) => oc.column("id").doNothing())
      .execute();

    return NextResponse.json({ message: "Seeded successfully" });
  } catch (error) {
    console.error("Seed failed:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}