import TabsWrapper from "@/components/TabsWrapper";
import Link from "next/link";

export default async function Index() {
  return (
    <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
          <TabsWrapper/>
          <Link href="/books" className="w-full">
            <button className="w-full disabled:bg-gray-300 bg-blue-300 text-white hover:bg-blue-200 transition-colors px-3 py-2 rounded-lg">Go to  Book</button>
          </Link>

          <p>
            Refresh me to see that the tab state is maintained. Awesome right?
          </p>
          <p>
            Click on the "Go to Book" button to navigate to the Book page.
          </p>
      </main>
    </div>
  );
}
