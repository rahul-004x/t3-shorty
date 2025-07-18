// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  text,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `drizzle_${name}`);

export const link = createTable("Link", {
  id: uuid("id").primaryKey().defaultRandom(),
  short: text("short").notNull().unique(),
  long: text("long").notNull(),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
