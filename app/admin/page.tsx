import { headers } from "next/headers";
import { env } from "cloudflare:workers";
import { currentAdmin } from "@/lib/admin-auth";
import AdminPanel from "./panel";
import AdminLogin from "./admin-login";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const h=await headers();
  const admin=await currentAdmin(new Request("https://tasamimak.local",{headers:{Cookie:h.get("cookie")||""}}));
  if(admin) return <AdminPanel email={admin.email}/>;
  const existing=await env.DB!.prepare("SELECT id FROM admin_users LIMIT 1").first();
  return <AdminLogin hasAdmin={!!existing}/>;
}
