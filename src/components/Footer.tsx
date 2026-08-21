export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--nav-border)] bg-[var(--nav-bg)] backdrop-blur-xl py-10 relative z-10 transition-colors">
      <div className="container mx-auto px-6 text-center max-w-6xl">
        <p className="text-sm text-slate-500 dark:text-zinc-400 font-light">
          © {new Date().getFullYear()} pkctechs. Engineered for precision and performance.
        </p>
      </div>
    </footer>
  );
}
