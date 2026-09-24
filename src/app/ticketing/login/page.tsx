import Link from "next/link";
import { MCMCLogo } from "@/components/brand/mcmc-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketingLoginPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><Card className="w-full max-w-md"><CardContent className="text-center"><div className="flex justify-center"><MCMCLogo variant="vertical" className="max-w-[240px]" /></div><h1 className="mt-8 text-2xl font-semibold text-slate-950">Internal Ticketing</h1><p className="mt-3 text-sm leading-6 text-slate-600">Mock staff login for internal hospital workflow tickets.</p><Link href="/ticketing" className="mt-6 block"><Button className="w-full">Enter Ticketing System</Button></Link></CardContent></Card></main>;
}
