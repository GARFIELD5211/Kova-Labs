import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer } from "@/components/layout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Kova Labs" },
      {
        name: "description",
        content:
          "Kova Labs Cookie Policy. Learn about the cookies and similar tracking technologies we use on our website.",
      },
      { property: "og:title", content: "Cookie Policy — Kova Labs" },
      {
        property: "og:description",
        content:
          "How Kova Labs uses cookies and similar tracking technologies.",
      },
    ],
  }),
  component: CookiesPage,
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
          Kova Labs Ltd. ("Kova Labs," "we," "us," or "our") uses cookies and
          similar tracking technologies on our website to enhance your browsing
          experience, analyse site traffic, and understand how our content is
          engaged with. This Cookie Policy explains what cookies are, which
          types we use, how you can manage them, and your rights regarding
          data collection via these technologies.
        </p>
        <p>
          By continuing to browse our website, you consent to the use of
          cookies as described in this policy, unless you have adjusted your
          browser settings to reject them. For more information about how we
          handle your personal data, please refer to our{" "}
          <Link
            to="/privacy"
            className="text-accent hover:underline transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "what-are-cookies",
    title: "2. What Are Cookies?",
    content: (
      <>
        <p>
          Cookies are small text files that are stored on your device (computer,
          tablet, or mobile) when you visit a website. They are widely used to
          make websites work more efficiently, provide a personalised browsing
          experience, and deliver information to the website owners.
        </p>
        <p>
          Cookies may be classified as:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Session cookies:</strong> Temporary cookies that expire
            when you close your browser.
          </li>
          <li>
            <strong>Persistent cookies:</strong> Cookies that remain on your
            device for a set period or until you manually delete them.
          </li>
          <li>
            <strong>First-party cookies:</strong> Set by the website you are
            visiting (in this case, kovalabs.tech).
          </li>
          <li>
            <strong>Third-party cookies:</strong> Set by a domain other than
            the one you are visiting, typically used for analytics or
            advertising purposes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-we-use",
    title: "3. Cookies We Use",
    content: (
      <>
        <p>
          We use the following categories of cookies on our website:
        </p>

        <h3 className="font-display text-lg md:text-xl mt-8 mb-4">
          a. Strictly Necessary Cookies
        </h3>
        <p>
          These cookies are essential for the proper functioning of our
          website. They enable basic functions such as page navigation, form
          submissions, and access to secure areas of the site. The website
          cannot function properly without these cookies.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="py-2 pr-4 font-display">Cookie</th>
                <th scope="col" className="py-2 pr-4 font-display">Purpose</th>
                <th scope="col" className="py-2 font-display">Duration</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">session_id</td>
                <td className="py-2 pr-4">Session management</td>
                <td className="py-2">Session</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">csrf_token</td>
                <td className="py-2 pr-4">Cross-site request forgery protection</td>
                <td className="py-2">Session</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-display text-lg md:text-xl mt-10 mb-4">
          b. Analytics Cookies
        </h3>
        <p>
          We use third-party analytics services, including Google Analytics, to
          collect anonymous information about how visitors use our website.
          These cookies help us understand which pages are most frequently
          visited, how users navigate our site, and what content is most
          engaging. All data collected is aggregated and anonymised.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="py-2 pr-4 font-display">Cookie</th>
                <th scope="col" className="py-2 pr-4 font-display">Purpose</th>
                <th scope="col" className="py-2 font-display">Duration</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                <td className="py-2 pr-4">Distinguishes unique users</td>
                <td className="py-2">2 years</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">_ga_&lt;ID&gt;</td>
                <td className="py-2 pr-4">Session state management</td>
                <td className="py-2">2 years</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                <td className="py-2 pr-4">Distinguishes unique users</td>
                <td className="py-2">24 hours</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">_gat</td>
                <td className="py-2 pr-4">Rate limiting and throttling</td>
                <td className="py-2">1 minute</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Google Analytics uses its own privacy policy, which you can review at{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            policies.google.com/privacy
          </a>
          . You can opt out of Google Analytics by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h3 className="font-display text-lg md:text-xl mt-10 mb-4">
          c. Performance and Functionality Cookies
        </h3>
        <p>
          These cookies allow our website to remember choices you make (such
          as preferred theme or region) and provide enhanced, more personalised
          features. They may also be used to support our form submissions and
          intake processes.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="py-2 pr-4 font-display">Cookie</th>
                <th scope="col" className="py-2 pr-4 font-display">Purpose</th>
                <th scope="col" className="py-2 font-display">Duration</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">preferences</td>
                <td className="py-2 pr-4">Stores user preference selections</td>
                <td className="py-2">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-display text-lg md:text-xl mt-10 mb-4">
          d. Third-Party Embed Cookies
        </h3>
        <p>
          Our website may embed content from third-party platforms (such as
          Vimeo videos, GitHub repositories, or social media feeds). These
          platforms may set their own cookies independently. We do not control
          the data practices of these third-party services and recommend
          reviewing their respective privacy and cookie policies.
        </p>
      </>
    ),
  },
  {
    id: "managing-cookies",
    title: "4. Managing and Disabling Cookies",
    content: (
      <>
        <p>
          You have the right to accept or reject cookies. Most web browsers
          automatically accept cookies, but you can usually modify your browser
          settings to decline some or all cookies if you prefer. The method
          for managing cookies varies by browser:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>Google Chrome:</strong> Settings → Privacy and Security →
            Cookies and Other Site Data.
          </li>
          <li>
            <strong>Mozilla Firefox:</strong> Options → Privacy & Security →
            Cookies and Site Data.
          </li>
          <li>
            <strong>Apple Safari:</strong> Preferences → Privacy → Cookies and
            Website Data.
          </li>
          <li>
            <strong>Microsoft Edge:</strong> Settings → Cookies and Site
            Permissions → Manage and Delete Cookies.
          </li>
        </ul>
        <p>
          Please note that disabling certain cookies, particularly strictly
          necessary cookies, may affect the functionality and performance of
          our website. For example, you may not be able to submit intake forms
          or access certain interactive features.
        </p>
        <p>
          You can also use the cookie consent banner displayed on your first
          visit to our website to manage your cookie preferences at any time.
        </p>
      </>
    ),
  },
  {
    id: "do-not-track",
    title: "5. Do Not Track (DNT) Signals",
    content: (
      <>
        <p>
          Some browsers include a "Do Not Track" (DNT) feature that signals to
          websites that you do not wish to have your online activity tracked.
          Our website does not currently respond to DNT signals, as there is
          no uniform industry standard for interpreting such signals.
        </p>
        <p>
          However, we respect your privacy choices and provide you with the
          tools to manage cookie preferences as described in Section 4 above.
          We will continue to monitor developments around DNT standards and
          update this policy accordingly.
        </p>
      </>
    ),
  },
  {
    id: "analytics-opt-out",
    title: "6. Analytics Opt-Out",
    content: (
      <>
        <p>
          To opt out of Google Analytics tracking across all websites, you can
          install the Google Analytics Opt-out Browser Add-on, which prevents
          Google Analytics JavaScript code from sharing information about your
          visits. You can download this add-on at:
        </p>
        <p className="mt-2">
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            https://tools.google.com/dlpage/gaoptout
          </a>
        </p>
        <p className="mt-4">
          Alternatively, you can use browser extensions such as Privacy Badger
          (from the Electronic Frontier Foundation) or uBlock Origin to block
          tracking scripts globally.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "7. Updates to This Policy",
    content: (
      <>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          in the technologies we use, our operational practices, or legal
          requirements. We encourage you to review this page periodically for
          the latest information about our use of cookies.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "8. Contact Us",
    content: (
      <>
        <p>
          If you have any questions about this Cookie Policy or our use of
          cookies and similar technologies, please contact us:
        </p>
        <div className="mt-6 p-6 border border-border rounded-xl bg-surface/50">
          <p className="font-display text-lg">Kova Labs Ltd.</p>
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
            <strong>Website:</strong>{" "}
            <Link to="/" className="text-accent hover:underline">
              kovalabs.tech
            </Link>
          </p>
        </div>
      </>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*                                Page Component                              */
/* -------------------------------------------------------------------------- */

function CookiesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* Hero header */}
      <section className="relative pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute -top-32 -right-20 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="container-x max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-6">Legal</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Cookie{" "}
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
