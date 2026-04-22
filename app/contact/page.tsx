import type { Metadata } from "next";

import { Mail, MapPin, Phone, Timer } from "lucide-react";

import { Container } from "@/components/landing/container";
import { Reveal } from "@/components/landing/reveal";
import { ContactForm } from "@/components/site/contact-form";
import { SiteShell } from "@/components/site/site-shell";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Contact | Raghunathpur Cable Network",
  description:
    "Contact Raghunathpur Cable Network for new connections, coverage checks, plan upgrades, and support.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHeader
        badge="Contact"
        title={
          <>
            Let’s get you{" "}
            <span className="text-gray-900 dark:text-gray-100">connected</span>
          </>
        }
        description="Share your location details and we’ll confirm coverage, plans, and the fastest installation slot."
      />

      <section className="container-section">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <Reveal>
              <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-md backdrop-blur-xl sm:p-8">
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Find us on the map
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Use the map to confirm your nearest landmark and share your
                  ward/tole for the fastest coverage check.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                  <iframe
                    title="Raghunathpur Cable Network on Google Maps"
                    className="h-105 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Raghunathpur%2C%20Cable%2C%20Network%2C%20Pvt.%2C%20Ltd.&output=embed"
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Raghunathpur Cable Network Pvt. Ltd.</span>
                  </div>
                  <a
                    className="font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.google.com/maps?q=Sabaila-12%2C%20Raghunathpur%2C%20Nepal">
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={0.06}>
                <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-md backdrop-blur-xl sm:p-8">
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Request a callback
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Share your details and we’ll confirm coverage, plans, and
                    the fastest installation slot.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-md backdrop-blur-xl sm:p-8">
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Contact details
                  </div>
                  <div className="mt-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          Phone
                        </div>
                        <a
                          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          href="tel:+9779801663644">
                          +977 9801663644
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          Email
                        </div>
                        <a
                          className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          href="mailto:raghunathpurcable2010@gmail.com">
                          raghunathpurcable2010@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          Address
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Sabaila-12, Raghunathpur, Nepal
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Timer className="mt-0.5 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          Support
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          24/7 assistance
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-indigo-500/15 bg-indigo-500/10 p-4 text-sm text-indigo-800 dark:text-indigo-200">
                    Tip: For fastest coverage confirmation, include your nearest
                    landmark and preferred installation time.
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
