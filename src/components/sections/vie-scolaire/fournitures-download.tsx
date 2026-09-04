"use client";

import * as React from "react";
import Link from "next/link";
import { FileTextIcon } from "@/components/ui/file-text";

import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { fournituresLevels, fournituresSuppliers } from "@/lib/content";

export function FournituresDownload() {
  const [level, setLevel] = React.useState<string>(fournituresLevels[0].file);

  return (
    <div className="flex flex-col gap-8 rounded-[28px] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-9">
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-lg font-medium tracking-tight">
          Télécharger la liste de fournitures
        </h3>
        <p className="text-[14px] leading-relaxed text-muted-foreground">
          Sélectionnez le niveau de votre enfant pour obtenir la liste de
          fournitures scolaires à jour.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Dropdown value={level} onValueChange={setLevel}>
            <DropdownTrigger aria-label="Sélectionner le niveau" className="flex-1" />
            <DropdownContent>
              {fournituresLevels.map((l) => (
                <DropdownItem key={l.file} value={l.file}>
                  {l.label}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          <Button asChild size="lg">
            <Link href={`/documents/fournitures/${level}.pdf`} target="_blank">
              <FileTextIcon size={18} />
              Télécharger
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-ink/[0.08] pt-6">
        <p className="text-[13px] font-medium text-muted-foreground">
          Nos partenaires libraires
        </p>
        <div className="flex flex-wrap gap-3">
          {fournituresSuppliers.map((s) => (
            <Link
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
