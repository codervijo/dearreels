import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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

export default function FAQ() {
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
