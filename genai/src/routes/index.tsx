import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImage from "@/assets/hero-parent.jpg";
import archiveImage from "@/assets/archive-still.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dearreals — Stay close to the people you love" },
      {
        name: "description",
        content:
          "A weekly WhatsApp service that captures your parents' stories — in their voice, their language, their time — and turns a year of conversations into a private family archive.",
      },
      { property: "og:title", content: "Dearreals — Stay close to the people you love" },
      {
        property: "og:description",
        content:
          "Weekly prompts on WhatsApp. Voice and video replies. A beautiful private archive at the end of every year.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Landing,
});

const prompts = [
  "What do you remember about your wedding day? Not the ceremony — the small things. What did you eat? What were you thinking?",
  "Tell us about your mother. What was she like? What is something she said that you still remember?",
  "What's a place from your childhood that doesn't exist anymore?",
  "If you could send one message to your grandchildren, what would it be?",
  "What song takes you back somewhere, the moment you hear it?",
];

const faqs = [
  {
    q: "What if my parent doesn't reply to a prompt?",
    a: "That's completely fine. There's no pressure and no streak to keep. Some weeks they'll write you a paragraph, some weeks they'll send a two-second voice note, some weeks they'll skip entirely. Every reply still finds its way into the archive — even the short ones.",
  },
  {
    q: "What languages does this work in?",
    a: "Any language they're comfortable speaking. Prompts can be sent in English, Hindi, Tamil, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Spanish, Portuguese, Arabic, and more. Replies can be in any language or mix of languages — voice notes especially can be exactly how they'd talk to you.",
  },
  {
    q: "Can multiple family members access the archive?",
    a: "Yes. You can share the archive with siblings, cousins, your children — anyone in the family. Each person gets their own private link.",
  },
  {
    q: "What if my parent doesn't use WhatsApp?",
    a: "WhatsApp is the one thing most parents already have. If they don't, helping them set it up is usually a one-time, fifteen-minute conversation. We can send you a simple walkthrough you can read to them over the phone.",
  },
  {
    q: "What happens at year-end?",
    a: "You'll receive a beautifully designed digital archive — searchable, organised by week, with every voice note, video, and photo your parent shared. A printed transcript book is included, hand-bound, sent to the address of your choice.",
  },
  {
    q: "Can I gift this to someone?",
    a: "Yes — many people do, especially for a sibling who lives far from home. You can buy it as a gift and we'll help you write a short note to the recipient.",
  },
  {
    q: "Refund policy?",
    a: "If it doesn't feel right in the first 30 days, we'll refund you fully — no questions, no forms.",
  },
];

function Landing() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyWhatsApp />
      <SamplePrompts />
      <Pricing />
      <FAQ />
      <SignupSection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
      <a href="#top" className="font-serif text-xl tracking-tight">
        Dearreals
      </a>
      <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
        <a href="#how" className="hover:text-foreground">How it works</a>
        <a href="#prompts" className="hover:text-foreground">Sample prompts</a>
        <a href="#pricing" className="hover:text-foreground">Pricing</a>
        <a href="#faq" className="hover:text-foreground">Questions</a>
      </nav>
      <a
        href="#signup"
        className="hidden rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90 md:inline-block"
      >
        Set this up
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-6 pt-10 pb-24 md:pt-16 md:pb-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-xl">
          <p className="mb-6 text-sm uppercase tracking-[0.18em] text-primary">
            For families who live far apart
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your mother has{" "}
            <em className="font-serif italic">stories</em> you haven't heard yet.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Every week, we send your parent a thoughtful question on WhatsApp.
            They reply in their own voice, their own language, their own time —
            and a year later, you have a private family archive worth keeping.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#signup"
              className="rounded-full bg-primary px-7 py-3.5 text-base text-primary-foreground transition hover:opacity-90"
            >
              Set this up for your family
            </a>
            <a
              href="#how"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              See how it works
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-md bg-accent/40" />
          <img
            src={heroImage}
            alt="A grandmother by a sunlit window, smiling on a phone call"
            width={1024}
            height={1024}
            className="aspect-square w-full rounded-md object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <p className="font-serif text-2xl leading-relaxed text-foreground md:text-3xl md:leading-[1.45]">
          You meant to call last Sunday. Then the week happened. Your father is
          getting older in a house you haven't sat in for three years, and the
          ten-minute calls you do manage are mostly about the weather. You love
          him. You just can't seem to bridge the distance with logistics alone.
        </p>
        <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
          So we built something quieter. Not another app for him to learn. Not
          another reminder for you to feel guilty about. Just a small, weekly
          rhythm that gives him a reason to tell you something — and gives you
          something to keep.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Tell us about your parent",
      body: "Their name, the language they're most at home in, the things they love to talk about. Five minutes, once.",
    },
    {
      n: "02",
      title: "We send a prompt each week",
      body: "On WhatsApp, on a quiet morning. They reply when they like, with a voice note, a video, a photo, or a few sentences.",
    },
    {
      n: "03",
      title: "A year, gathered with care",
      body: "At year-end, your family receives a private digital archive and a hand-bound printed transcript — every voice, every story, kept.",
    },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-primary">
          How it works
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">
          Three small steps, then we get out of the way.
        </h2>
      </div>
      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {steps.map((s) => (
          <div key={s.n}>
            <div className="font-serif text-3xl italic text-primary/70">{s.n}</div>
            <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyWhatsApp() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-5 md:gap-16 md:py-28">
        <div className="md:col-span-2">
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-primary">
            Why WhatsApp
          </p>
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            Because your parent already knows how to use it.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:col-span-3 md:text-lg">
          <p>
            There's nothing to install. No login to remember. No new icon on a
            home screen they didn't ask for.
          </p>
          <p>
            A prompt arrives in the same chat where their friends and family
            already write to them. They reply in their own language — typed,
            spoken, or in pictures — whenever the moment feels right. Some
            mornings it's a sentence. Some mornings it's twenty minutes of a
            story you've never heard.
          </p>
          <p>
            That's the whole interface. We thought it should be that simple.
          </p>
        </div>
      </div>
    </section>
  );
}

function SamplePrompts() {
  return (
    <section id="prompts" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-primary">
          A few of the prompts
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">
          The kind of questions you'd ask if you had the time.
        </h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Every prompt is written by a person, not pulled from a template. They're
          specific enough to invite a real answer, gentle enough not to ask too much.
        </p>
      </div>

      <div className="mt-14 space-y-5">
        {prompts.map((p, i) => (
          <figure
            key={i}
            className="border-l-2 border-primary/60 bg-card/60 px-7 py-6 md:px-10 md:py-7"
          >
            <blockquote className="font-serif text-xl leading-relaxed text-foreground md:text-2xl md:leading-[1.5]">
              <span className="mr-1 text-primary/70">“</span>
              {p}
              <span className="ml-0.5 text-primary/70">”</span>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="grid items-start gap-12 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-2">
            <img
              src={archiveImage}
              alt="A bound book and handwritten letters on a wooden table"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-md object-cover shadow-sm"
            />
          </div>
          <div className="md:col-span-3">
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-primary">
              One simple plan
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              $149 a year, for the whole family.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              One price. No upsells. Everything below is included for one parent
              and as many family members as you want to share the archive with.
            </p>

            <ul className="mt-10 space-y-4 text-base text-foreground">
              {[
                "A thoughtful weekly prompt, sent on WhatsApp",
                "Replies in voice, video, photo or text — in any language",
                "A private year-end digital archive, searchable and shareable",
                "A hand-bound printed transcript book, shipped at year-end",
                "Real humans curating the prompts — not a chatbot",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-primary" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#signup"
              className="mt-10 inline-block rounded-full bg-primary px-7 py-3.5 text-base text-primary-foreground transition hover:opacity-90"
            >
              Set this up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="mb-12">
        <p className="mb-4 text-sm uppercase tracking-[0.18em] text-primary">
          Questions
        </p>
        <h2 className="font-serif text-4xl leading-tight md:text-5xl">
          Things people ask, before they sign up.
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
            <AccordionTrigger className="py-6 text-left font-serif text-xl hover:no-underline md:text-2xl">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function SignupSection() {
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

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-lg">Dearreals</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Made by a small team, for families who live too far apart.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="mailto:hello@example.com" className="hover:text-foreground">
            hello@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}
