import { initCronJob } from "@/src/cron/job";

initCronJob();

export async function GET() {
  return Response.json({ message: "Cron initialized" });
}
