import { MailboxIcon } from "@/components/ui/mailbox";

export function NewsletterForm() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-primary">
        <MailboxIcon size={16} />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="text-[13px] font-medium text-foreground">Newsletter</p>
        <p className="text-[13px] text-muted-foreground">Bientôt disponible</p>
      </div>
    </div>
  );
}
