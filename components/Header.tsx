export default function Header() {
  return (
    <div className="flex flex-col space-y-16 items-center">
      
      <h1 className="sr-only">The largest book hub in town.</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        <span className="font-bold">Welcome</span> to the largest <span className="font-bold">book hub</span> in town.
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
