import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Kova Labs" },
      {
        name: "description",
        content:
          "Kova Labs Terms of Service governing the use of our website, software development services, and SaaS engagements.",
      },
      { property: "og:title", content: "Terms of Service — Kova Labs" },
      {
        property: "og:description",
        content:
          "Terms governing Kova Labs software development and SaaS services.",
      },
    ],
  }),
  component: TermsPage,
});

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const LAST_UPDATED = "June 1, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing the Kova Labs website, engaging our services, or
          using any of our digital products, you agree to be bound by these
          Terms of Service ("Terms"). If you do not agree with any part of
          these Terms, you must not use our website or services.
        </p>
        <p>
          These Terms constitute a legally binding agreement between you
          ("Client," "you," or "your") and Kova Labs Ltd. ("Kova Labs,"
          "we," "us," or "our"). For specific software development or SaaS
          engagements, a separate Master Services Agreement (MSA) or
          Statement of Work (SOW) will govern the particulars of the
          project.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "2. Scope of Services",
    content: (
      <>
        <p>
          Kova Labs provides B2B software development, design, consulting,
          and related technical services. The specific scope, deliverables,
          timeline, and fees for each engagement are defined in a mutually
          executed Statement of Work (SOW) or similar agreement.
        </p>
        <p>Our services include, but are not limited to:</p>
        <ul className="space-y-2">
          <li>Full-stack web and mobile application development.</li>
          <li>Shopify Plus ecosystem design, development, and migration.</li>
          <li>AI automation pipeline engineering and LLM integration.</li>
          <li>
            API development, middleware engineering, and systems integration.
          </li>
          <li>UX auditing, conversion rate optimisation (CRO), and design.</li>
          <li>SaaS MVP development and rapid prototyping.</li>
        </ul>
        <p>
          Any services not explicitly described in a signed SOW are outside
          the scope of the engagement and may be quoted separately.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    title: "3. Client Responsibilities",
    content: (
      <>
        <p>As a client engaging Kova Labs, you agree to:</p>
        <ul className="space-y-2">
          <li>
            Provide accurate, complete, and timely information, materials, and
            feedback necessary for the execution of the project.
          </li>
          <li>
            Designate a single point of contact authorised to make decisions
            and approve deliverables.
          </li>
          <li>
            Ensure that all materials, content, and intellectual property
            provided to Kova Labs are lawfully owned or licensed by you and do
            not infringe upon third-party rights.
          </li>
          <li>
            Make timely payments as specified in the applicable SOW or
            invoice schedule.
          </li>
          <li>
            Provide reasonable access to systems, platforms, and
            stakeholders as needed for project delivery.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property Rights",
    content: (
      <>
        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          a. Deliverables
        </h3>
        <p>
          Upon full payment of all fees due under the applicable SOW, Kova
          Labs assigns to the Client all right, title, and interest in and to
          the custom-developed source code, design assets, and technical
          documentation created specifically for the project ("Deliverables").
        </p>
        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          b. Pre-existing Materials
        </h3>
        <p>
          Kova Labs retains all intellectual property rights in any
          pre-existing tools, libraries, frameworks, methodologies, and
          know-how used in the course of the project ("Pre-existing
          Materials"). The Client receives a non-exclusive,
          non-transferable, perpetual licence to use Pre-existing Materials
          solely as incorporated into the Deliverables.
        </p>
        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          c. Portfolio Rights
        </h3>
        <p>
          Kova Labs reserves the right to display completed projects in our
          portfolio, case studies, website, and marketing materials unless a
          mutual non-disclosure agreement explicitly prohibits such display.
          We will not disclose confidential business information in any
          public case study.
        </p>
        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          d. Third-Party Components
        </h3>
        <p>
          Deliverables may incorporate open-source or third-party components
          governed by their own licences (e.g., MIT, Apache 2.0, GPL). Kova
          Labs will disclose such components and their licence terms to the
          Client. The Client is responsible for compliance with the terms of
          those third-party licences.
        </p>
      </>
    ),
  },
  {
    id: "fees-payment",
    title: "5. Fees and Payment",
    content: (
      <>
        <p>
          Fees for services are outlined in the applicable SOW or proposal.
          Unless otherwise agreed in writing:
        </p>
        <ul className="space-y-2">
          <li>
            A deposit of fifty percent (50%) of the projected fee is due
            prior to the commencement of work.
          </li>
          <li>
            The remaining balance is due upon delivery and acceptance of
            final deliverables, or according to a milestone schedule defined
            in the SOW.
          </li>
          <li>
            Invoices are due within fifteen (15) days of the invoice date.
            Late payments may incur a service charge of 1.5% per month or the
            maximum rate permitted by applicable law.
          </li>
          <li>
            All fees are quoted and payable in United States Dollars (USD)
            unless otherwise stated.
          </li>
          <li>
            The Client is responsible for any applicable taxes, duties, or
            withholding taxes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "6. Confidentiality",
    content: (
      <>
        <p>
          Both parties agree to maintain the confidentiality of all
          proprietary information disclosed during the engagement. This
          includes, but is not limited to:
        </p>
        <ul className="space-y-2">
          <li>Source code, algorithms, and technical architecture.</li>
          <li>Business plans, financial data, and customer information.</li>
          <li>Product roadmaps, feature specifications, and timing.</li>
          <li>Employee, contractor, and personnel information.</li>
        </ul>
        <p>
          Confidentiality obligations survive the termination of the
          engagement for a period of five (5) years, or indefinitely for
          trade secrets. These obligations do not apply to information that:
          (a) is or becomes publicly available through no fault of the
          receiving party; (b) was rightfully in the receiving party's
          possession prior to disclosure; (c) is independently developed by
          the receiving party; or (d) is required to be disclosed by law.
        </p>
      </>
    ),
  },
  {
    id: "warranties",
    title: "7. Warranties and Disclaimers",
    content: (
      <>
        <p>
          Kova Labs warrants that services will be performed in a
          professional and workmanlike manner in accordance with industry
          standards. Upon written notice from the Client within thirty (30)
          days of delivery, we will correct any reproducible defect in the
          Deliverables at no additional charge.
        </p>
        <p className="mt-4">
          <strong>
            Except as expressly stated in these Terms, all services and
            deliverables are provided "as is" and "as available," without
            warranty of any kind, whether express or implied, including but
            not limited to the implied warranties of merchantability, fitness
            for a particular purpose, and non-infringement.
          </strong>
        </p>
        <p>
          Kova Labs does not warrant that: (a) the deliverables will meet
          all of the Client's specific requirements; (b) operation of the
          deliverables will be uninterrupted or error-free; or (c) all
          defects will be corrected.
        </p>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "8. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, in no event
          shall Kova Labs be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to
          loss of profits, data, use, goodwill, or other intangible losses,
          arising out of or in connection with these Terms or the services
          provided, whether based on warranty, contract, tort (including
          negligence), or any other legal theory.
        </p>
        <p className="mt-4">
          Kova Labs' total liability for any claim arising under these Terms
          or any engagement shall not exceed the total fees paid by the
          Client to Kova Labs in the twelve (12) months preceding the event
          giving rise to the claim.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "9. Termination",
    content: (
      <>
        <p>
          Either party may terminate an engagement under the following
          conditions:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>For convenience:</strong> The Client may terminate a SOW
            with thirty (30) days' written notice. Fees for work completed
            up to the termination date remain due and payable.
          </li>
          <li>
            <strong>For cause:</strong> Either party may terminate if the
            other party commits a material breach that remains uncured for
            fifteen (15) days after written notice.
          </li>
          <li>
            <strong>Immediate termination:</strong> Either party may
            terminate immediately if the other party becomes insolvent,
            files for bankruptcy, or ceases operations.
          </li>
        </ul>
        <p>
          Upon termination, the Client shall pay for all work completed and
          expenses incurred up to the effective date. Kova Labs will deliver
          all work product completed as of the termination date.
        </p>
      </>
    ),
  },
  {
    id: "website-use",
    title: "10. Website Use and Acceptable Conduct",
    content: (
      <>
        <p>
          When using our website, you agree not to:
        </p>
        <ul className="space-y-2">
          <li>
            Use any automated means (bots, scrapers, crawlers) to access,
            monitor, or copy content without our express written permission.
          </li>
          <li>
            Introduce malware, viruses, or any harmful code that could
            disrupt our systems.
          </li>
          <li>
            Attempt to gain unauthorised access to our servers, databases,
            or internal systems.
          </li>
          <li>
            Impersonate any person or entity or misrepresent your
            affiliation with any person or entity.
          </li>
          <li>
            Engage in any activity that could damage, disable, or impair the
            functionality of our website or services.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law and Dispute Resolution",
    content: (
      <>
        <p>
          These Terms shall be governed by and construed in accordance with
          the laws of Pakistan, without regard to its conflict of law
          provisions.
        </p>
        <p>
          Any dispute arising out of or relating to these Terms or the
          services provided shall first be submitted to good-faith
          negotiation between the parties for a period of thirty (30) days.
          If the dispute cannot be resolved through negotiation, it shall be
          finally settled by arbitration in Islamabad, Pakistan, in
          accordance with the rules of the Pakistan International
          Arbitration Centre.
        </p>
        <p>
          Each party shall bear its own legal fees and costs in connection
          with any dispute, unless the arbitrator determines that a party
          has acted in bad faith or without substantial justification.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content: (
      <>
        <p>
          For questions, concerns, or requests regarding these Terms, please
          contact us:
        </p>
        <div className="mt-6 p-6 border border-border rounded-xl bg-surface/50">
          <p className="font-display text-lg">Kova Labs Ltd.</p>
          <p className="mt-2 text-muted-foreground">
            Mezzanine Floor, Muzaffar Chamber Plaza
            <br />
            Fazal-e-Haq Road, Blue Area
            <br />
            Islamabad, Pakistan
          </p>
          <p className="mt-3">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contact@kovalabs.tech"
              className="text-accent hover:underline"
            >
              contact@kovalabs.tech
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    id: "changes",
    title: "13. Changes to These Terms",
    content: (
      <>
        <p>
          We reserve the right to modify these Terms at any time. Changes
          will be effective upon posting to our website, with the updated
          date noted at the top of this page. Continued use of our website
          or services after any modification constitutes acceptance of the
          revised Terms.
        </p>
        <p>
          For active clients, we will provide direct written notice of
          material changes to these Terms at least fifteen (15) days before
          they take effect.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                                Page Component                              */
/* -------------------------------------------------------------------------- */

function TermsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* Hero header */}
      <section className="relative pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="container-x max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-6">Legal</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Terms of{" "}
            <span className="italic text-accent">Service.</span>
          </h1>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Last updated: {LAST_UPDATED}
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 eyebrow hover:text-foreground transition-colors"
            >
              <span>←</span>
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-x max-w-3xl mx-auto pb-24 md:pb-40">
        <div className="space-y-12 text-left">
          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 className="font-display text-2xl md:text-3xl leading-tight mb-6">
                {section.title}
              </h2>
              <div className="prose-custom space-y-4 text-muted-foreground leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
