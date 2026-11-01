import type { HealthResponse } from "@todo-bucket/contracts";
import { Hono } from "hono";

export const app = new Hono<{ Bindings: Env }>();

app.get("/health", (c) => c.json({ status: "ok" } satisfies HealthResponse));
