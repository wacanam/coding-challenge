import ProjectLogo from "@/components/ProjectLogo";
import AuthButton from "@/components/AuthButton";

export const Navigation = () => {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <ProjectLogo />
        <AuthButton />
      </div>
    </nav>
  );
};
