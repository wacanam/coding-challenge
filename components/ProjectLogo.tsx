import Link from "next/link";

export default function ProjectLogo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <span className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center font-medium">BH</span>
        <span className="font-medium">Book Hub</span>
      </div>
    </Link>
  );
}
