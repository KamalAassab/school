"use client";

import { useState } from "react";
import { MailboxIcon } from "@/components/ui/mailbox";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center text-primary">
          <MailboxIcon size={16} />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-[13px] font-medium text-foreground">Newsletter</p>
          <p className="text-[13px] text-muted-foreground">
            Restez informé des actualités de l'école.
          </p>
        </div>
      </div>

      {submitted ? (
        <p className="text-[13px] font-medium text-primary">
          Merci ! Vous êtes bien inscrit.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="min-w-0 flex-1 rounded-xl border border-ink/10 bg-white px-3.5 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            S'abonner
          </button>
        </form>
      )}
    </div>
  );
}
