import { z } from "zod";
import { eq, sql } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { link } from "@/server/db/schema";
import { nanoid } from "nanoid";

export const postRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(link);
  }),

  create: publicProcedure
    .input(
      z.object({
        long: z.string().url(),
        custom: z.string().min(3).max(30).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { long, custom } = input;

      // Check if custom alias already exists if provided
      if (custom) {
        const existing = await ctx.db
          .select()
          .from(link)
          .where(eq(link.short, custom))
          .limit(1);
        if (existing.length) {
          throw new Error("Custom alias already exists");
        }
      }

      // Generate short link - either use custom or generate with nanoid
      const short = custom ?? nanoid(6);

      // Insert the new link
      const [newLink] = await ctx.db
        .insert(link)
        .values({ long, short })
        .returning();

      return {
        shortUrl: `http://localhost:3000/${newLink?.short}`,
      };
    }),
  incrementClick: publicProcedure
    .input(z.object({ short: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(link)
        .set({ clicks: sql`${link.clicks} + 1` })
        .where(eq(link.short, input.short));
    }),
});
