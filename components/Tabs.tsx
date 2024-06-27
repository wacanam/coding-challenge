"use client";

import React, { createContext, useState, useEffect, useRef } from 'react';

// Define TypeScript interface for the context
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
}>
}
// Create context with a specific type
export const TabsContext = createContext<TabsContextType>({
  activeTab: '',
  setActiveTab: () => {},
  tabRefs: { current: {} }
});

interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  defaultTab: string;
  onChangeTab: (value: string) => void;
  children: React.ReactNode;
}

export const Tabs = ({ defaultTab, onChangeTab, children, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const tabRefs = useRef<{[key:string]: HTMLDivElement | null }>({}); 

  const [activeTabStyle, setActiveTabStyle] = useState<React.CSSProperties>({
    left: 0,
    width: 0,
    opacity: 0
  });

  useEffect(() => {
    // Update activeTabStyle based on the current active tab
    if (activeTab && tabRefs.current[activeTab]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[activeTab]!;
      setActiveTabStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]); // Depend on activeTab to recalculate when it changes

  
  const handleChange = (value: string) => {
    setActiveTab(value);
    if (onChangeTab) onChangeTab(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleChange, tabRefs }}>
       <nav role="tablist" className="overflow-hidden relative flex">
        <div {...props} style={activeTabStyle}></div>
        {children}
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-yellow-300 rounded-t-xl"></div>
      </nav>
    </TabsContext.Provider>
  );
};
