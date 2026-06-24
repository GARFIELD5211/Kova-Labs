import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Kova Labs" },
      {
        name: "description",
        content:
          "Kova Labs Privacy Policy. Learn how we collect, use, and protect your data as a B2B software development and SaaS agency.",
      },
      { property: "og:title", content: "Privacy Policy — Kova Labs" },
      {
        property: "og:description",
        content: "How Kova Labs collects, uses, and protects your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const LAST_UPDATED = "June 1, 2026";

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>
          Kova Labs Ltd. ("Kova Labs," "we," "us," or "our") is a B2B software
          development and SaaS agency headquartered in Islamabad, Pakistan. We
          are committed to protecting the privacy and confidentiality of the
          personal data entrusted to us by our clients, partners, website
          visitors, and prospective customers.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website, interact with
          our services, or communicate with us. Please read this policy
          carefully. By accessing our website or using our services, you
          acknowledge the practices described herein.
        </p>
      </>
    ),
  },
  {
    id: "information-collection",
    title: "2. Information We Collect",
    content: (
      <>
        <p>
          We collect information that you voluntarily provide to us, as well as
          information automatically collected when you interact with our digital
          properties.
        </p>
        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          a. Information You Provide
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>Contact details:</strong> Name, business email address,
            phone number, and company name when you submit an intake form,
            request a consultation, or communicate with us.
          </li>
          <li>
            <strong>Project requirements:</strong> Details about your project
            scope, technical specifications, budget preferences, and timelines
            shared through our intake or discovery process.
          </li>
          <li>
            <strong>Communication records:</strong> Correspondence via email,
            phone, or messaging platforms, including recordings where permitted
            by applicable law.
          </li>
          <li>
            <strong>Billing information:</strong> Invoice details, tax
            identifiers, and payment processing information handled securely
            through our third-party payment processors.
          </li>
        </ul>
        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          b. Information Collected Automatically
        </h3>
        <ul className="space-y-2">
          <li>
            <strong>Usage data:</strong> Pages visited, time spent on pages,
            referral sources, navigation paths, and interaction patterns.
          </li>
          <li>
            <strong>Device data:</strong> IP address, browser type, operating
            system, device type, and screen resolution.
          </li>
          <li>
            <strong>Analytics data:</strong> Aggregated behavioural data
            collected via third-party analytics tools (see our{" "}
            <Link
              to="/cookies"
              className="text-accent hover:underline transition-colors"
            >
              Cookie Policy
            </Link>{" "}
            for details).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "use-of-information",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use the collected information for the following purposes:</p>
        <ul className="space-y-2">
          <li>
            <strong>Service delivery:</strong> To evaluate project feasibility,
            develop and deliver software solutions, provide ongoing support, and
            manage client relationships.
          </li>
          <li>
            <strong>Communication:</strong> To respond to inquiries, send
            project updates, share relevant technical documentation, and
            coordinate delivery timelines.
          </li>
          <li>
            <strong>Business improvement:</strong> To analyse website usage
            patterns, improve our service offerings, and enhance user
            experience.
          </li>
          <li>
            <strong>Legal compliance:</strong> To comply with applicable laws,
            regulations, and legal processes, and to enforce our agreements and
            policies.
          </li>
          <li>
            <strong>Marketing (with consent):</strong> To send occasional
            communications about our services, case studies, and industry
            insights where you have opted in to receive such information.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing and Disclosure",
    content: (
      <>
        <p>
          We do not sell your personal information. We may share your data under
          the following circumstances:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Service providers:</strong> With trusted third-party vendors
            who assist us in operating our business — such as cloud
            infrastructure providers, payment processors, analytics services,
            and communication tools — provided they enter into data processing
            agreements that safeguard your data.
          </li>
          <li>
            <strong>Legal obligations:</strong> When required by law, court
            order, or government regulation, or to protect the rights, property,
            or safety of Kova Labs, our clients, or others.
          </li>
          <li>
            <strong>Business transfers:</strong> In connection with a merger,
            acquisition, or sale of all or a portion of our assets, with
            reasonable notice to you where practicable.
          </li>
          <li>
            <strong>Client consent:</strong> With your explicit consent or at
            your direction.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "client-confidentiality",
    title: "5. Client Confidentiality",
    content: (
      <>
        <p>
          We treat all client information and project materials as strictly
          confidential. Our engagements are governed by Non-Disclosure
          Agreements (NDAs) that prohibit unauthorised disclosure of:
        </p>
        <ul className="space-y-2">
          <li>
            Proprietary source code, architecture designs, and technical
            documentation.
          </li>
          <li>Business strategies, product roadmaps, and competitive data.</li>
          <li>Client employee, customer, or partner information.</li>
          <li>Financial arrangements, pricing, and contractual terms.</li>
        </ul>
        <p>
          We implement industry-standard access controls, encryption practices,
          and internal policies to ensure that confidential information is
          accessible only to personnel with a legitimate need.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: (
      <>
        <p>
          We retain personal information only as long as necessary to fulfil the
          purposes described in this policy, or as required by applicable law.
          Retention periods vary based on the nature of the data:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Client project data:</strong> Retained for the duration of
            the engagement plus seven (7) years for legal and tax compliance.
          </li>
          <li>
            <strong>Inquiry and intake data:</strong> Retained for up to two (2)
            years following the last contact.
          </li>
          <li>
            <strong>Analytics data:</strong> Retained in aggregated,
            anonymised form for up to twenty-six (26) months.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "7. Data Security",
    content: (
      <>
        <p>
          We employ administrative, technical, and physical safeguards to
          protect your personal information, including:
        </p>
        <ul className="space-y-2">
          <li>
            Encryption of data in transit (TLS 1.2+) and at rest (AES-256).
          </li>
          <li>
            Role-based access controls and multi-factor authentication for
            internal systems.
          </li>
          <li>Regular security audits and vulnerability assessments.</li>
          <li>
            Strict internal data handling policies and employee training
            programmes.
          </li>
        </ul>
        <p>
          Notwithstanding these measures, no method of electronic storage or
          transmission is 100% secure. We cannot guarantee absolute security
          but will promptly notify you in the event of a data breach affecting
          your personal information as required by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    content: (
      <>
        <p>
          Depending on your jurisdiction, you may have the following rights
          regarding your personal data:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold
            about you.
          </li>
          <li>
            <strong>Rectification:</strong> Request correction of inaccurate or
            incomplete data.
          </li>
          <li>
            <strong>Erasure:</strong> Request deletion of your personal data
            where it is no longer necessary for the purposes for which it was
            collected.
          </li>
          <li>
            <strong>Restriction:</strong> Request restriction of processing
            under certain circumstances.
          </li>
          <li>
            <strong>Portability:</strong> Request a structured, commonly used
            format of your data.
          </li>
          <li>
            <strong>Objection:</strong> Object to processing based on legitimate
            interests or direct marketing.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the details
          in Section 11. We will respond to your request within thirty (30)
          days.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "9. Third-Party Services",
    content: (
      <>
        <p>
          Our website and services may utilise third-party tools and platforms
          that operate under their own privacy policies. These may include:
        </p>
        <ul className="space-y-2">
          <li>
            Analytics providers (e.g., Google Analytics) for website usage
            tracking.
          </li>
          <li>
            Cloud infrastructure providers for hosting and data storage.
          </li>
          <li>Payment processors for billing and invoicing.</li>
          <li>
            Communication platforms for client correspondence and project
            management.
          </li>
        </ul>
        <p>
          We encourage you to review the privacy policies of these third-party
          services. Kova Labs is not responsible for the data practices of
          third-party providers.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "10. Intellectual Property",
    content: (
      <>
        <p>
          All source code, design assets, technical documentation, and
          deliverables created by Kova Labs for our clients are the intellectual
          property of the respective client upon full payment, subject to the
          terms of our Master Services Agreement.
        </p>
        <p>
          Kova Labs retains the right to display completed projects in our
          portfolio, case studies, and marketing materials unless otherwise
          agreed in writing. We respect all third-party intellectual property
          rights and require our clients to warrant that they have the
          necessary rights to any materials provided to us for project
          execution.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Information",
    content: (
      <>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us:
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
          <p className="mt-1">
            <strong>Response time:</strong> Within one (1) business day.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, legal requirements, or operational context. Material
          changes will be communicated via our website or direct written notice
          to active clients.
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

function PrivacyPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* Hero header */}
      <section className="relative pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="container-x max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-6">Legal</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Privacy{" "}
            <span className="italic text-accent">Policy.</span>
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
