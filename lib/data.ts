import { sql } from "@vercel/postgres";
import { Question, User } from "./definitions";
import { db } from "./db";

/**
 * Query all titles
 */
export async function fetchTitles(
  page: number,
  minYear: number,
  maxYear: number,
  query: string,
  genres: string[],
  userEmail: string
) {
  try {
    // Get favorites title ids
    const favorites = (
      await db
        .selectFrom("favorites")
        .select("title_id")
        .where("user_id", "=", userEmail)
        .execute()
    ).map((row) => row.title_id);

    // Get watch later title ids
    const watchLater = (
      await db
        .selectFrom("watchlater")
        .select("title_id")
        .where("user_id", "=", userEmail)
        .execute()
    ).map((row) => row.title_id);

    // Build the query
    let queryBuilder = db
      .selectFrom("titles")
      .selectAll("titles")
      .orderBy("titles.title", "asc")
      // .limit(6)
      // .offset((page - 1) * 6);

    // Only apply filters if they exist
    if (minYear && Number(minYear) > 0) {
      queryBuilder = queryBuilder.where("titles.released", ">=", Number(minYear));
    }
    if (maxYear && Number(maxYear) <= new Date().getFullYear()) {
      queryBuilder = queryBuilder.where("titles.released", "<=", Number(maxYear));
    }    
    if (query) {
      queryBuilder = queryBuilder.where("titles.title", "ilike", `%${query}%`);
    }
    if (genres.length > 0) {
      queryBuilder = queryBuilder.where("titles.genre", "in", genres);
    }

    // Fetch the titles
    const titles = await queryBuilder.execute();

    return titles.map((row) => ({
      ...row,
      favorited: favorites.includes(row.id),
      watchLater: watchLater.includes(row.id),
      image: `/images/${row.id}.webp`,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch titles.");
  }
}


/**
 * Get a users favorites list.
 */
export async function fetchFavorites(page: number, userEmail: string) {
  try {
    const watchLater = (
      await db
        .selectFrom("watchlater")
        .select("title_id")
        .where("user_id", "=", userEmail)
        .execute()
    ).map((row) => row.title_id);

    const titles = await db
      .selectFrom("titles")
      .selectAll("titles")
      .innerJoin("favorites", "titles.id", "favorites.title_id")
      .where("favorites.user_id", "=", userEmail)
      .orderBy("titles.released", "asc")
      .limit(6)
      .offset((page - 1) * 6)
      .execute();

    return titles.map((row) => ({
      ...row,
      favorited: true,
      watchLater: watchLater.includes(row.id),
      image: `/images/${row.id}.webp`,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites.");
  }
}

/**
 *  Add a title to a users favorites list.
 */
/**
 *  Add a title to a user's favorites list.
 */
export async function insertFavorite(title_id: string, userEmail: string) {
  try {
    // Ensure the query is correct and using the right SQL syntax
    await db
      .insertInto("favorites")
      .values({ title_id, user_id: userEmail })
      .execute();

    // Optionally log or return a success message
    await insertActivity(title_id, userEmail, "FAVORITED");
    
    return { message: "Favorite Added" };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add favorite.");
  }
}


/**
 * Remove a title from a users favorites list.
 */
export async function deleteFavorite(title_id: string, userEmail: string) {
  try {
    // Attempt to delete the favorite and return affected rows if supported
    const result = await db
      .deleteFrom("favorites")
      .where("title_id", "=", title_id)
      .where("user_id", "=", userEmail)
      .returning(["title_id"]) // This depends on your DB/library, use it if available
      .execute();

    if (result.length === 0) {
      // No rows were affected, meaning the favorite didn't exist or wasn't deleted
      throw new Error("Favorite not found or already removed");
    }

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete favorite.");
  }
}




/**
 * Check if a title is in a users favorites list.
 */
export async function favoriteExists(title_id: string, userEmail: string): Promise<boolean> {
  try {
    const data = await db
      .selectFrom("favorites")
      .select("title_id")
      .where("title_id", "=", title_id)
      .where("user_id", "=", userEmail)
      .execute();

    return data.length > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorite.");
  }
}


/**
 * Get a users watch later list.
 */
export async function fetchWatchLaters(page: number, userEmail: string) {
  try {
    const favorites = (
      await db
        .selectFrom("favorites")
        .select("title_id")
        .where("user_id", "=", userEmail)
        .execute()
    ).map((row) => row.title_id);

    const titles = await db
      .selectFrom("titles")
      .selectAll("titles")
      .innerJoin("watchlater", "titles.id", "watchlater.title_id")
      .where("watchlater.user_id", "=", userEmail)
      .orderBy("titles.released", "asc")
      .limit(6)
      .offset((page - 1) * 6)
      .execute();

    return titles.map((row) => ({
      ...row,
      favorited: favorites.includes(row.id),
      watchLater: true,
      image: `/images/${row.id}.webp`,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch watchLater.");
  }
}

/**
 * Add a title to a users watch later list.
 */
export async function insertWatchLater(title_id: string, userEmail: string) {
  // try {
  //   const data =
  //     await sql<Question>`INSERT INTO watchLater (title_id, user_id) VALUES (${title_id}, ${userEmail})`;

  //   insertActivity(title_id, userEmail, "WATCH_LATER");
  //   return data.rows;
  // } catch (error) {
  //   console.error("Database Error:", error);
  //   throw new Error("Failed to add watchLater.");
  // }
  try {
    // Ensure the query is correct and using the right SQL syntax
    await db
      .insertInto("watchlater")
      .values({ title_id, user_id: userEmail })
      .execute();

    // Optionally log or return a success message
    await insertActivity(title_id, userEmail, "WATCH_LATER");
    
    return { message: "WATCH LATER Added" };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add watch later.");
  }
}

/**
 * Remove a title from a users watch later list.
 */
export async function deleteWatchLater(title_id: string, userEmail: string) {
  // try {
  //   const data =
  //     await sql`DELETE FROM watchLater WHERE title_id = ${title_id} AND user_id = ${userEmail}`;
  //   return data.rows;
  // } catch (error) {
  //   console.error("Database Error:", error);
  //   throw new Error("Failed to add watchLater.");
  // }
  try {
    // Attempt to delete the favorite and return affected rows if supported
    const result = await db
      .deleteFrom("watchlater")
      .where("title_id", "=", title_id)
      .where("user_id", "=", userEmail)
      .returning(["title_id"])
      .execute();

    if (result.length === 0) {
      // No rows were affected, meaning the favorite didn't exist or wasn't deleted
      throw new Error("Watch-later not found or already removed");
    }

    return result;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete watch-later");
  }
}

/**
 * Check if a movie title exists in a user's watch later list.
 */
export async function watchLaterExists(
  title_id: string,
  userEmail: string
): Promise<boolean> {
  try {
    const data = await db
      .selectFrom('watchlater')
      .select('title_id')
      .where('title_id', '=', title_id)
      .where('user_id', '=', userEmail)
      .execute();

    return data.length > 0;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch watchLater.");
  }
}

/**
 * Get all genres for titles.
 */
export async function fetchGenres(): Promise<string[]> {
  try {
    const data = await db
      .selectFrom("titles")
      .distinct()
      .select("titles.genre")
      .execute();

    return data.map((row) => row.genre);
  } catch (error) {
    console.error("Error fetching genres from database:", error);
    throw new Error("Failed to fetch genres.");
  }
}

/**
 * Get a users favorites list.
 */
export async function fetchActivities(page: number, userEmail: string) {
  try {
    const activities = await db
      .selectFrom("activities")
      .innerJoin("titles", "activities.title_id", "titles.id")
      .select([
        "activities.id",
        "activities.timestamp",
        "activities.activity",
        "titles.title",
      ])
      .where("activities.user_id", "=", userEmail)
      .orderBy("activities.timestamp", "desc")
      .limit(10)
      .offset((page - 1) * 10)
      .execute();

    return activities;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch favorites.");
  }
}

async function insertActivity(
  title_id: string,
  userEmail: string,
  activity: "FAVORITED" | "WATCH_LATER"
) {
  try {
    const data =
      await sql<Question>`INSERT INTO activities (title_id, user_id, activity) VALUES (${title_id}, ${userEmail}, ${activity})`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add activity.");
  }
}
