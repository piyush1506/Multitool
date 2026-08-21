"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck } from "lucide-react";

export default function PasswordGeneratorClient() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const generatePassword = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("");
      return;
    }

    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
      <div className="lg:col-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[380px]">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-zinc-400">Generated Password</span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
              <ShieldCheck className="h-4 w-4" /> Strong & Secure
            </div>
          </div>

          <div className="p-6 bg-slate-100 dark:bg-zinc-950/60 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
            <span className="font-mono text-xl font-bold tracking-wider text-slate-800 dark:text-zinc-100 break-all">
              {password || "Select at least one character set"}
            </span>
            <button
              onClick={handleCopy}
              disabled={!password}
              className="p-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all shrink-0"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-end">
          <button
            onClick={generatePassword}
            className="flex items-center gap-2 bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 dark:hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            <RefreshCw className="h-4 w-4 text-emerald-400" /> Regenerate
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <KeyRound className="h-6 w-6 text-emerald-500" /> Rules
          </h2>

          <div className="flex flex-col gap-5">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-zinc-300">
                <span>Length</span>
                <span className="text-emerald-500 font-bold">{length} chars</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => setIncludeUpper(e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-500"
                />
                Uppercase (A-Z)
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => setIncludeLower(e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-500"
                />
                Lowercase (a-z)
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-500"
                />
                Numbers (0-9)
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-sm font-medium text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-500"
                />
                Symbols (!@#$)
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
