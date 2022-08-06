// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { cardRouter } from "./card.router";
import { headerRouter } from "./header.router";
import { vcardRouter } from "./vcard.router";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge('bupCards.', cardRouter)
  .merge('header.', headerRouter)
  .merge('vcard.', vcardRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
