"use client";
import React, { useContext, ReactNode } from 'react';
import { TabsContext } from './Tabs';

interface TabProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export default function Tab({ value, children, ...props }: TabProps) {
  const { setActiveTab, tabRefs } = useContext(TabsContext);

  const handleClick = () => {
    setActiveTab(value);
  };

  return (
    <div
      ref={(el) => tabRefs.current[value] = el}
      {...props}
      role='tab'
      onClick={handleClick}
      aria-controls={`content-0`}
      tabIndex={1}
    >
      {children}
    </div>
  );
};
