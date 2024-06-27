import { TabsContext } from "@/components/Tabs";
import { useContext } from "react";
  
  export const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error('useTabs must be used within a TabsProvider');
    }
    return context;
  }