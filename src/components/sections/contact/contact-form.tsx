"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { siteConfig } from "@/lib/content";

const schema = z.object({
  name: z.string().min(2, "Merci d'indiquer votre nom complet."),
  email: z.string().email("Adresse e-mail invalide."),
  subject: z.string().min(3, "Merci de préciser l'objet de votre message."),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    const body = `Nom : ${values.name}\nEmail : ${values.email}\n\n${values.message}`;
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Nom complet" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Votre nom et prénom"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </FormField>
        <FormField label="Adresse e-mail" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="vous@exemple.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </FormField>
      </div>

      <FormField label="Objet" htmlFor="subject" error={errors.subject?.message}>
        <Input
          id="subject"
          placeholder="Inscription, rendez-vous, information..."
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
      </FormField>

      <FormField label="Votre message" htmlFor="message" error={errors.message?.message}>
        <Textarea
          id="message"
          placeholder="Écrivez votre message ici..."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </FormField>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          Envoyer le message
          <PaperPlaneTilt weight="fill" className="size-4" />
        </Button>
        {sent ? (
          <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary">
            <CheckCircle weight="fill" className="size-4" />
            Votre messagerie va s&rsquo;ouvrir
          </span>
        ) : null}
      </div>
    </form>
  );
}
