export const Footer = () => {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          &copy; {new Date().getFullYear()} Book Hub
        </a>
        {" "}by Andrew Thompson Codding Challenge
      </p>
    </footer>
  );
};
