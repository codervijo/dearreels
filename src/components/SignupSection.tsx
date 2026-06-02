import { useState } from "react";

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-foreground" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary"
      />
    </div>
  );
}

export default function SignupSection() {
  const [state, setState] = useState<"idle" | "submitting" | "done">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const existing = JSON.parse(localStorage.getItem("leads") || "[]");
      existing.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem("leads", JSON.stringify(existing));
    } catch {}
    setState("done");
  }

  return (
    <section id="signup" className="border-t border-border/60 bg-accent/30">
      <div className="mx-auto max-w-2xl px-6 py-24 md:py-32">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-primary">
          Set this up
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">
          Tell us about the parent you'd want this for.
        </h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Leave your details and a little about them. We'll write back personally
          within a day.
        </p>

        {state === "done" ? (
          <div className="mt-12 rounded-md border border-primary/30 bg-background px-7 py-8">
            <p className="font-serif text-2xl">Thank you.</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We've got your note. Someone will write back to you soon — from a
              real email address, not a no-reply.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 space-y-6">
            <Field label="Your name" name="name" required />
            <Field label="Your email" name="email" type="email" required />
            <div>
              <label className="mb-2 block text-sm text-foreground" htmlFor="about">
                A little about the parent you have in mind
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                placeholder="e.g. My mother in Kerala, she's 72, loves cooking and old film songs."
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={state === "submitting"}
              className="rounded-full bg-primary px-7 py-3.5 text-base text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {state === "submitting" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
