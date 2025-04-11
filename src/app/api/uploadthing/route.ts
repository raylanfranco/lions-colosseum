// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { uploadRouter } from "./core"; // adjust if your file is elsewhere

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
