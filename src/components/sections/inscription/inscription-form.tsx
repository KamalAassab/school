"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SendIcon } from "@/components/ui/send";
import { CircleCheckIcon } from "@/components/ui/circle-check";
import { FileTextIcon } from "@/components/ui/file-text";
import { CircleHelpIcon } from "@/components/ui/circle-help";
import { ArrowRightIcon } from "@/components/ui/arrow-right";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { Switch } from "@/components/ui/switch";
import { Illustration } from "@/components/site/illustration";
import { cn } from "@/lib/utils";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import {
  niveauxScolaires,
  filieresLycee,
  affiliationsTuteur,
  inscriptionDocuments,
  siteConfig,
} from "@/lib/content";

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

const schema = z.object({
  eleveNom: z.string().min(1, "Champ requis."),
  elevePrenom: z.string().min(1, "Champ requis."),
  dateNaissance: z
    .string()
    .min(1, "Champ requis.")
    .regex(dateRegex, "Format attendu : JJ-MM-AAAA."),
  sexe: z.enum(["garcon", "fille"]),
  niveau: z.string().min(1, "Merci de sélectionner un niveau."),
  filiere: z.string().optional(),
  transport: z.enum(["oui", "non"]),
  cantine: z.enum(["oui", "non"]),
  ecoleProvenance: z.string().min(1, "Champ requis."),
  villeEcole: z.string().optional(),
  tuteurNom: z.string().min(1, "Champ requis."),
  tuteurPrenom: z.string().min(1, "Champ requis."),
  affiliation: z.string().min(1, "Champ requis."),
  telephone: z.string().min(1, "Champ requis."),
  fonction: z.string().min(1, "Champ requis."),
});

type FormValues = z.infer<typeof schema>;

export function InscriptionForm() {
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      eleveNom: "",
      elevePrenom: "",
      dateNaissance: "",
      sexe: "garcon",
      niveau: "",
      filiere: "",
      transport: "non",
      cantine: "non",
      ecoleProvenance: "",
      villeEcole: "",
      tuteurNom: "",
      tuteurPrenom: "",
      affiliation: "",
      telephone: "",
      fonction: "",
    },
  });

  const niveau = watch("niveau");
  const isLycee = /Bac|Tronc Commun/.test(niveau ?? "");

  const onSubmit = (values: FormValues) => {
    const lines = [
      `Élève : ${values.elevePrenom} ${values.eleveNom}`,
      `Date de naissance : ${values.dateNaissance}`,
      `Sexe : ${values.sexe === "garcon" ? "Garçon" : "Fille"}`,
      `Niveau souhaité : ${values.niveau}`,
      values.filiere ? `Filière : ${values.filiere}` : null,
      `Transport scolaire : ${values.transport === "oui" ? "Oui" : "Non"}`,
      `Cantine : ${values.cantine === "oui" ? "Oui" : "Non"}`,
      `École de provenance : ${values.ecoleProvenance}`,
      values.villeEcole ? `Ville de l'école : ${values.villeEcole}` : null,
      "",
      `Tuteur légal : ${values.tuteurPrenom} ${values.tuteurNom}`,
      `Affiliation : ${values.affiliation}`,
      `Téléphone : ${values.telephone}`,
      `Fonction : ${values.fonction}`,
    ].filter(Boolean);

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Nouvelle inscription - ${values.elevePrenom} ${values.eleveNom}`
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setSent(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      {/* 
        Unified Inscription Card:
        Box 1 (Left: Élève & Scolarité) and Box 2 (Bottom Right: Tuteur & Submit)
        form ONE single continuous card wrapped around Box 3 (Top Right: Pièces demandées).
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] lg:items-stretch">
        {/* CARD PART 1: Left Wing (Élève) */}
        <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col rounded-t-[28px] lg:rounded-t-[28px] lg:rounded-b-none bg-white p-4 pt-4 pb-4 sm:p-8 sm:pt-6 sm:pb-5 lg:p-8 lg:pt-6 lg:pb-5 shadow-[0_1px_0_rgba(32,26,21,0.04)] border border-ink/[0.06] border-b-0">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="border-b border-ink/[0.06] pb-3">
              <h2 className="font-display text-2xl font-medium tracking-tight sm:text-[1.75rem]">
                Nouvelles inscriptions à l&rsquo;école School Academy
              </h2>
            </div>

            {/* Section: Informations de l'élève */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
                Informations de l&rsquo;élève
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <FormField label="Nom *" htmlFor="eleveNom" error={errors.eleveNom?.message}>
                  <Input id="eleveNom" aria-invalid={!!errors.eleveNom} {...register("eleveNom")} />
                </FormField>
                <FormField label="Prénom *" htmlFor="elevePrenom" error={errors.elevePrenom?.message}>
                  <Input
                    id="elevePrenom"
                    aria-invalid={!!errors.elevePrenom}
                    {...register("elevePrenom")}
                  />
                </FormField>
                <FormField
                  label="Date de naissance *"
                  htmlFor="dateNaissance"
                  error={errors.dateNaissance?.message}
                >
                  <Input
                    id="dateNaissance"
                    placeholder="JJ-MM-AAAA"
                    aria-invalid={!!errors.dateNaissance}
                    {...register("dateNaissance")}
                  />
                </FormField>
                <FormField label="Sexe" htmlFor="sexe">
                  <Controller
                    control={control}
                    name="sexe"
                    render={({ field }) => (
                      <SegmentedToggle
                        name="sexe"
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { label: "Garçon", value: "garcon" },
                          { label: "Fille", value: "fille" },
                        ]}
                      />
                    )}
                  />
                </FormField>
              </div>
            </div>

            {/* Section: Scolarité (Niveau & Filière) */}
            <div className="flex flex-col gap-4">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
                Scolarité
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <FormField label="Niveau souhaité *" htmlFor="niveau" error={errors.niveau?.message}>
                  <Controller
                    control={control}
                    name="niveau"
                    render={({ field }) => (
                      <Dropdown value={field.value} onValueChange={field.onChange}>
                        <DropdownTrigger
                          id="niveau"
                          placeholder="Sélectionner"
                          aria-invalid={!!errors.niveau}
                          className="px-3 sm:px-5 text-sm sm:text-[15px]"
                        />
                        <DropdownContent>
                          {niveauxScolaires.map((n) => (
                            <DropdownItem key={n} value={n}>
                              {n}
                            </DropdownItem>
                          ))}
                        </DropdownContent>
                      </Dropdown>
                    )}
                  />
                </FormField>
                <FormField label="Filière (lycée)" htmlFor="filiere">
                  <Controller
                    control={control}
                    name="filiere"
                    render={({ field }) => (
                      <Dropdown
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!isLycee}
                      >
                        <DropdownTrigger
                          id="filiere"
                          placeholder="Non applicable"
                          className="px-3 sm:px-5 text-sm sm:text-[15px]"
                        />
                        <DropdownContent>
                          {filieresLycee.map((f) => (
                            <DropdownItem key={f} value={f}>
                              {f}
                            </DropdownItem>
                          ))}
                        </DropdownContent>
                      </Dropdown>
                    )}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </div>

        {/* Concave connector: smooths the inner corner where Card 1's bottom edge meets Card 2's top-left edge */}
        <div
          aria-hidden
          className="hidden lg:block lg:col-start-1 lg:row-start-2 lg:self-end lg:justify-self-end size-7"
          style={{
            background:
              "radial-gradient(circle at top left, transparent 28px, #fff 28px)",
          }}
        />

        {/* BOX 3: Pièces généralement demandées - self-start prevents overflow below Card 1 */}
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:self-start lg:ml-7 mt-6 lg:mt-0 flex flex-col justify-between gap-5 rounded-[28px] bg-ink p-7 text-background sm:p-8 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FileTextIcon size={26} className="text-brand shrink-0" />
              <h3 className="font-display text-lg font-medium">
                Pièces généralement demandées
              </h3>
            </div>

            <div className="flex flex-col min-[440px]:flex-row items-center min-[440px]:items-start gap-4 sm:gap-6 pt-1">
              <div className="shrink-0 flex items-center justify-center">
                <Illustration
                  src="/assets/undraw_grading-papers_lty0.svg"
                  width={781}
                  height={800}
                  className="max-w-[110px] sm:max-w-[130px] lg:max-w-[140px] max-h-[130px] w-auto h-auto object-contain select-none"
                />
              </div>

              <ul className="flex flex-1 flex-col gap-2.5">
                {inscriptionDocuments.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-background/80"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-2.5 rounded-2xl bg-background/[0.06] p-3.5 text-[12.5px] leading-relaxed text-background/65">
              <CircleHelpIcon size={16} className="mt-0.5 shrink-0 text-brand" />
              Liste indicative : notre équipe vous communique le dossier complet et à
              jour lors de la prise de contact.
            </div>

            <Button asChild variant="brand" size="default" className="w-fit self-center mx-auto">
              <Link href="/contact">
                Nous contacter directement
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
          </div>
        </div>

        {/* CARD PART 2: Full-width bottom (Scolarité + Tuteur légal) */}
        <div className="order-2 lg:order-none lg:col-start-1 lg:col-span-2 lg:row-start-3 rounded-[28px] lg:rounded-tl-none bg-white p-4 pt-5 pb-5 sm:p-8 sm:pt-6 lg:p-10 lg:pt-6 flex flex-col gap-6 mt-6 lg:mt-0 shadow-[0_1px_0_rgba(32,26,21,0.04)] border border-ink/[0.06] lg:border-t-0">
          {/* Scolarité (suite) */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
              <FormField label="Transport scolaire" htmlFor="transport">
                <Controller
                  control={control}
                  name="transport"
                  render={({ field }) => (
                    <div className="flex h-10 sm:h-13 w-full items-center justify-between gap-2 rounded-xl border border-input bg-white px-3 whitespace-nowrap">
                      <span
                        className={cn(
                          "text-xs sm:text-[14px] font-medium transition-colors",
                          field.value === "oui" ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {field.value === "oui" ? "Oui" : "Non"}
                      </span>
                      <Switch
                        id="transport"
                        checked={field.value === "oui"}
                        onCheckedChange={(checked) => field.onChange(checked ? "oui" : "non")}
                      />
                    </div>
                  )}
                />
              </FormField>
              <FormField label="Cantine" htmlFor="cantine">
                <Controller
                  control={control}
                  name="cantine"
                  render={({ field }) => (
                    <div className="flex h-10 sm:h-13 w-full items-center justify-between gap-2 rounded-xl border border-input bg-white px-3 whitespace-nowrap">
                      <span
                        className={cn(
                          "text-xs sm:text-[14px] font-medium transition-colors",
                          field.value === "oui" ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {field.value === "oui" ? "Oui" : "Non"}
                      </span>
                      <Switch
                        id="cantine"
                        checked={field.value === "oui"}
                        onCheckedChange={(checked) => field.onChange(checked ? "oui" : "non")}
                      />
                    </div>
                  )}
                />
              </FormField>
              <FormField
                label="École de provenance *"
                htmlFor="ecoleProvenance"
                error={errors.ecoleProvenance?.message}
              >
                <Input
                  id="ecoleProvenance"
                  aria-invalid={!!errors.ecoleProvenance}
                  {...register("ecoleProvenance")}
                />
              </FormField>
              <FormField label="Ville de l&rsquo;école" htmlFor="villeEcole">
                <Input id="villeEcole" {...register("villeEcole")} />
              </FormField>
            </div>
          </div>

          {/* Coordonnées du tuteur légal */}
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="border-b border-ink/[0.06] pb-4">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
                Coordonnées du tuteur légal
              </h3>
            </div>

            {/* Tuteur Fields — all 5 in one row on desktop */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-5">
              <FormField label="Nom *" htmlFor="tuteurNom" error={errors.tuteurNom?.message}>
                <Input id="tuteurNom" aria-invalid={!!errors.tuteurNom} {...register("tuteurNom")} />
              </FormField>
              <FormField label="Prénom *" htmlFor="tuteurPrenom" error={errors.tuteurPrenom?.message}>
                <Input
                  id="tuteurPrenom"
                  aria-invalid={!!errors.tuteurPrenom}
                  {...register("tuteurPrenom")}
                />
              </FormField>
              <FormField
                label="Affiliation *"
                htmlFor="affiliation"
                error={errors.affiliation?.message}
              >
                <Controller
                  control={control}
                  name="affiliation"
                  render={({ field }) => (
                    <Dropdown value={field.value} onValueChange={field.onChange}>
                      <DropdownTrigger
                        id="affiliation"
                        placeholder="Sélectionner"
                        aria-invalid={!!errors.affiliation}
                      />
                      <DropdownContent>
                        {affiliationsTuteur.map((a) => (
                          <DropdownItem key={a} value={a}>
                            {a}
                          </DropdownItem>
                        ))}
                      </DropdownContent>
                    </Dropdown>
                  )}
                />
              </FormField>
              <FormField
                label="Téléphone *"
                htmlFor="telephone"
                error={errors.telephone?.message}
              >
                <Input
                  id="telephone"
                  placeholder="Exp. 0660-88-88-88"
                  aria-invalid={!!errors.telephone}
                  {...register("telephone")}
                />
              </FormField>
              <FormField
                label="Fonction *"
                htmlFor="fonction"
                error={errors.fonction?.message}
                className="col-span-2 sm:col-span-1 lg:col-span-1"
              >
                <Input id="fonction" aria-invalid={!!errors.fonction} {...register("fonction")} />
              </FormField>
            </div>
          </div>

          {/* Submission and Action */}
          <div className="flex flex-col gap-4 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12.5px] leading-relaxed text-muted-foreground">
              N.B. Les champs marqués d&rsquo;un astérisque * sont obligatoires.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {sent ? (
                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
                  <CircleCheckIcon size={16} />
                  Votre messagerie va s&rsquo;ouvrir
                </span>
              ) : null}
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                Envoyer votre demande
                <SendIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
