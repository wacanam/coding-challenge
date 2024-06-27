"use client"

import React from "react";
import { Tabs } from "./Tabs";
import Each from "./Each";
import { useRouter, useSearchParams } from "next/navigation";
import Tab from "./Tab";

export default function TabsWrapper() {
  const router = useRouter();
  const currentTab = useSearchParams().get("tab") as string | null;
  const tabs = ["First", "Second", "Third", "Fourth"]

  return (
    <Tabs 
      defaultTab={currentTab || "First"}
      onChangeTab={(value) => router.replace("?tab=" + value)} 
      className={`active-tab absolute bottom-0 bg-yellow-300 rounded-t-2xl h-full transition-all duration-300 z-1`}
    >
      <Each
        of={tabs}
        render={(tab, index) => (
          <Tab value={tab} key={index} className="relative z-2 active-tab text-gray-600 py-4 px-6 h-20 block  hover:text-yellow-500 focus:text-black rounded-t-2xl">{tab}</Tab>
        )}
      />
    </Tabs>
  );
}
