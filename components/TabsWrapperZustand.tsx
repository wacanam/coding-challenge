"use client"

import React from "react";
import { Tabs } from "./Tabs";
import Each from "./Each";
import { useRouter, useSearchParams } from "next/navigation";
import Tab from "./Tab";
import { useStore } from "@/hooks/useStore";

export default function TabsWrapperZustand() {
  const tabs = ["First", "Second", "Third", "Fourth"]
  const tabStore = useStore((state) => state)

  return (
    <Tabs 
      defaultTab={tabStore.tab}
      onChangeTab={(value) => tabStore.setTab(value)} 
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
