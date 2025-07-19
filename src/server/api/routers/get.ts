import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { link } from "@/server/db/schema";

export const getRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(link);
  }),
})
