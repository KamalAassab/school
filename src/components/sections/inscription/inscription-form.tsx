"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SendIcon } from "@/components/ui/send";
import { CircleCheckIcon } from "@/components/ui/circle-check";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { niveauxScolaires, filieresLycee, affiliationsTuteur, siteConfig } from "@/lib/content";

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
    defaultValues: { sexe: "garcon", transport: "non", cantine: "non" },
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" noValidate>
      <div className="flex flex-col gap-5">
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
          Informations de l&rsquo;élève
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

      <div className="flex flex-col gap-5">
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
          Scolarité
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Niveau souhaité *" htmlFor="niveau" error={errors.niveau?.message}>
            <Controller
              control={control}
              name="niveau"
              render={({ field }) => (
                <Dropdown value={field.value} onValueChange={field.onChange}>
                  <DropdownTrigger
                    id="niveau"
                    placeholder="Sélectionner un niveau"
                    aria-invalid={!!errors.niveau}
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
          <FormField label="Filière (uniquement pour le lycée)" htmlFor="filiere">
            <Controller
              control={control}
              name="filiere"
              render={({ field }) => (
                <Dropdown
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!isLycee}
                >
                  <DropdownTrigger id="filiere" placeholder="Non applicable" />
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
          <FormField label="Transport scolaire" htmlFor="transport">
            <Controller
              control={control}
              name="transport"
              render={({ field }) => (
                <SegmentedToggle
                  name="transport"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Oui", value: "oui" },
                    { label: "Non", value: "non" },
                  ]}
                />
              )}
            />
          </FormField>
          <FormField label="Cantine" htmlFor="cantine">
            <Controller
              control={control}
              name="cantine"
              render={({ field }) => (
                <SegmentedToggle
                  name="cantine"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Oui", value: "oui" },
                    { label: "Non", value: "non" },
                  ]}
                />
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

      <div className="flex flex-col gap-5">
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-primary">
          Coordonnées du tuteur légal
        </h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          <FormField label="Fonction *" htmlFor="fonction" error={errors.fonction?.message}>
            <Input id="fonction" aria-invalid={!!errors.fonction} {...register("fonction")} />
          </FormField>
        </div>
      </div>

      <p className="text-[12.5px] leading-relaxed text-muted-foreground">
        N.B. Les champs marqués d&rsquo;un astérisque * sont obligatoires.
      </p>

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          Envoyer votre demande
          <SendIcon size={16} />
        </Button>
        {sent ? (
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
            <CircleCheckIcon size={16} />
            Votre messagerie va s&rsquo;ouvrir
          </span>
        ) : null}
      </div>
    </form>
  );
}
