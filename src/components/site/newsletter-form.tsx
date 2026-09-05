"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MailboxIcon } from "@/components/ui/mailbox";
import { storage } from "@/lib/storage";

const STORAGE_KEY = "newsletter:submitted";
const DRAFT_KEY = "newsletter:draft";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSubmitted(storage.get(STORAGE_KEY) === "1");
    setEmail(storage.get(DRAFT_KEY) ?? "");
    setHydrated(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    storage.set(DRAFT_KEY, e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    storage.set(STORAGE_KEY, "1");
    storage.remove(DRAFT_KEY);
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <MailboxIcon size={18} />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm sm:text-[15px] font-semibold text-foreground">Newsletter</p>
          <p className="text-xs sm:text-[13px] text-muted-foreground">
            Restez informé des actualités et temps forts de School Academy.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-auto lg:min-w-[340px] xl:min-w-[380px]">
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.p
              key="success"
              initial={hydrated ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-[13px] font-medium text-primary py-2 text-center lg:text-left"
            >
              Merci&nbsp;! Vous êtes bien inscrit.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              initial={hydrated ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="min-w-0 w-full flex-1 rounded-xl border border-ink/10 bg-white px-3.5 py-2 text-xs sm:text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 rounded-xl bg-primary px-4 py-2 text-xs sm:text-[13px] font-medium text-white transition-colors hover:bg-[#9c3a00] active:scale-95 cursor-pointer"
              >
                S&rsquo;abonner
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
