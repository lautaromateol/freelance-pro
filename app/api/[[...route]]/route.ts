/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono"
import { handle } from "hono/vercel"
import accounts from "./accounts"
import categories from "./categories"
import clients from "./clients"
import transactions from "./transactions"
import projects from "./projects"

export const runtime = "edge"

const app = new Hono().basePath("/api")

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/clients", clients)
  .route("/transactions", transactions)
  .route("/projects", projects)

  export const GET = handle(app)
  export const POST = handle(app)
  export const PATCH = handle(app)
  export const DELETE = handle(app)
  
  export type AppType = typeof routes