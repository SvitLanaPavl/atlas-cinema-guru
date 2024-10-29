import { auth } from "@/auth";
import { fetchTitles } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/titles
 */
export const GET = auth(async (req: NextRequest) => {
  //@ts-ignore
  if (!req.auth) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const {
    user: { email }, //@ts-ignore
  } = req.auth;

  const params = req.nextUrl.searchParams;
  const page = params.get("page") ? Number(params.get("page")) : 1;
  const minYear = params.get("minYear") ? Number(params.get("minYear")) : 0;
  const maxYear = params.get("maxYear")
    ? Number(params.get("maxYear"))
    : new Date().getFullYear();
  const query = params.get("query") ?? "";
  const genres = params.get("genres")?.split(",") ?? []; // Default to an empty array

  // Fetch the movies from the database
  try {
    const titles = await fetchTitles(page, minYear, maxYear, query, genres, email);

    return NextResponse.json({
      titles, // Return the list of titles
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch titles" },
      { status: 500 }
    );
  }
});
