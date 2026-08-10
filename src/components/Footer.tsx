export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black/20 py-8 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} pkctechs. Built with Next.js for high performance.
        </p>
      </div>
    </footer>
  );
}
