import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import z from "zod";
export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      if (input.category) {
        //   const categoriesData = await ctx.db.find({
        //     collection: "categories",
        //     limit: 1,
        //     pagination: false,
        //     where: {
        //       slug: {
        //         equals: input.category,
        //       },
        //     },
        //   });
        //   const category = categoriesData.docs[0];
        // if (category) {
        where["category.slug"] = {
          equals: input.category,
        };
        // }
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
      });
      console.log(data);

      return data;
    }),
});
