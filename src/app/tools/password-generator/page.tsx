import { Metadata } from "next";
import PasswordGeneratorClient from "@/components/tools/PasswordGeneratorClient";

export const metadata: Metadata = {
  title: "Password & Token Generator | Secure Random Password Tool",
  description: "Generate cryptographically secure passwords and random API tokens online.",
  keywords: "password, generator, token, secure, free online tool, pkctechs",
  applicationName: "Password & Token Generator",
  openGraph: {
    siteName: "Password & Token Generator",
  }
};

export default function PasswordGeneratorPage() {
  return (
    <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 gradient-text">
          Password & Token Generator
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Create strong, cryptographically secure passwords and random tokens locally in your browser.
        </p>
      </div>
      <PasswordGeneratorClient />
    </div>
  );
}
