import Link from 'next/link';

import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative">
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Link href="/days_alive" className="underline">How many days have you been alive</Link>
          <Separator />
          <Link href="https://magan.info" className="underline">My Blog</Link>
          <Separator />
          <Link href="https://getlinkin.chat" className="underline">IG Automation App</Link>
        </CardContent>
      </Card>
    </main>
  );
}