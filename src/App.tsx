import { FormEvent, useMemo, useState } from 'react';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const benefits = [
  {
    title: 'Lead Generation Focused',
    text: 'Clear offers, strong calls to action, and contact paths designed around real business inquiries.',
    metric: 'More inquiries',
  },
  {
    title: 'Mobile Friendly Design',
    text: 'A polished experience for prospects browsing from phones, tablets, laptops, and desktops.',
    metric: 'Every screen',
  },
  {
    title: 'Fast & Professional Setup',
    text: 'A focused launch plan that gives small businesses a credible web presence without wasted time.',
    metric: 'Launch ready',
  },
];

const services = [
  {
    title: 'Website Design',
    text: 'Modern page layouts, professional typography, and trust-building sections for service businesses.',
  },
  {
    title: 'Lead Generation Pages',
    text: 'Focused landing pages that present the offer, handle objections, and move visitors to contact.',
  },
  {
    title: 'Contact Form Setup',
    text: 'Simple forms with validation, confirmation messaging, and fields that capture the right details.',
  },
  {
    title: 'SEO-Friendly Structure',
    text: 'Clean headings, readable copy hierarchy, metadata, and page structure built for discoverability.',
  },
];

const processSteps = ['Position the offer', 'Design the page', 'Capture the lead'];

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = values.phone.replace(/\D/g, '');

  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (phoneDigits.length < 10) {
    errors.phone = 'Please enter at least 10 digits.';
  }
  if (!values.message.trim()) errors.message = 'Please tell us what you need.';

  return errors;
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{text}</p>
    </div>
  );
}

function App() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const formIsFilled = useMemo(
    () => Object.values(values).some((value) => value.trim().length > 0),
    [values],
  );

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      setValues(initialValues);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Your Company home">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-lg font-bold text-white shadow-lg shadow-slate-900/15">
              Y
            </span>
            <span className="text-lg font-bold text-navy">Your Company</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                className="transition hover:text-brand-600"
                href={`#${item.toLowerCase() === 'home' ? 'home' : item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Get a Free Quote
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="overflow-hidden bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_72%)]">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-18 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24">
            <div>
              <p className="inline-flex rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
                Professional websites for service businesses
              </p>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
                Grow Your Business With a Website That Converts
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                We help small businesses turn visitors into real leads with modern design,
                clear messaging, and simple contact forms.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="rounded-lg bg-brand-600 px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
                >
                  Get Started
                </a>
                <a
                  href="#services"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-center font-semibold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700"
                >
                  View Services
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                {[
                  ['24h', 'Quote follow-up'],
                  ['100%', 'Mobile ready'],
                  ['3-step', 'Launch process'],
                ].map(([stat, label]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                    <strong className="block text-2xl text-navy">{stat}</strong>
                    <span className="mt-1 block text-sm text-slate-600">{label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">Trusted demo structure for:</span>
                <span>Contractors</span>
                <span>Consultants</span>
                <span>Local services</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-10 top-8 h-48 w-48 rounded-full bg-brand-100 blur-3xl" />
              <div className="relative rounded-2xl border border-slate-200 bg-white p-3 shadow-soft">
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300" />
                    <span className="ml-3 h-7 flex-1 rounded-md bg-slate-100" />
                  </div>
                  <div className="grid gap-4 p-5 sm:grid-cols-[1fr_0.72fr]">
                    <div className="rounded-xl bg-navy p-5 text-white">
                      <p className="text-sm text-blue-100">Lead performance</p>
                      <div className="mt-3 flex items-end justify-between">
                        <h3 className="text-3xl font-bold">86</h3>
                        <span className="rounded-lg bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                          +32%
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-blue-100">qualified requests this month</p>
                      <div className="mt-6 flex h-28 items-end gap-2">
                        {[44, 68, 54, 84, 72, 96, 88].map((height, index) => (
                          <span
                            key={height + index}
                            className="flex-1 rounded-t-md bg-brand-500"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-navy">New quote request</p>
                          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                            New
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          "Need a service page and contact form this month."
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">Conversion checklist</p>
                        <div className="mt-3 space-y-3">
                          {['Clear headline', 'Trust proof', 'Contact form'].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-sm font-medium text-navy">
                              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Why it works"
              title="A better first impression for every prospect"
              text="The site focuses on credibility, clarity, and a direct path to action so visitors know exactly why to contact you."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">
                    {benefit.metric}
                  </p>
                  <h3 className="mt-4 text-xl font-bold text-navy">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                About us
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Built for small businesses that need results, not noise
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Your Company gives local service teams a sharper online presence, clearer
                messaging, and a smoother path from website visitor to booked conversation.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-lg leading-8 text-slate-600">
                Your Company is a small business partner focused on professional service,
                customer trust, and measurable outcomes. We help teams present their value
                clearly online, make it easy for prospects to take action, and launch websites
                that feel credible from the first visit.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {processSteps.map((item, index) => (
                  <div key={item} className="rounded-lg bg-slate-50 p-4">
                    <span className="text-sm font-bold text-brand-600">0{index + 1}</span>
                    <p className="mt-2 text-sm font-semibold text-navy">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Services"
              title="Everything needed for a polished lead-generation site"
              text="Simple, high-impact services that help visitors understand your value and contact you faster."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-100 hover:shadow-soft"
                >
                  <div className="mb-5 h-1.5 w-14 rounded-full bg-brand-600" />
                  <h3 className="text-lg font-bold text-navy">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                Proof of value
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-navy">
                Designed to make the next step obvious
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-4xl font-bold text-navy">3.4x</p>
                <p className="mt-2 font-semibold text-slate-700">clearer call-to-action density</p>
                <p className="mt-3 leading-7 text-slate-600">
                  Repeated quote and consultation prompts help prospects take action without hunting.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-4xl font-bold text-navy">0</p>
                <p className="mt-2 font-semibold text-slate-700">backend required for the demo</p>
                <p className="mt-3 leading-7 text-slate-600">
                  The site is simple to preview, share, and evolve into a production client project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl bg-navy px-6 py-12 text-center shadow-soft sm:px-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Turn Visitors Into Customers?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
              Give prospects a clear reason to trust you and a simple way to reach out.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-lg bg-white px-6 py-3.5 font-semibold text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Request a Free Consultation
            </a>
          </div>
        </section>

        <section id="contact" className="bg-slate-50 px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">
                Contact
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Request your free quote
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Send a quick message and we will follow up with next steps for your website demo.
              </p>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="font-semibold text-navy">What happens next</p>
                <div className="mt-4 space-y-4">
                  {['We review your request', 'We identify the best page structure', 'You get a clear next step'].map(
                    (item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <form
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  value={values.name}
                  error={errors.name}
                  onChange={(value) => updateField('name', value)}
                />
                <Field
                  label="Email"
                  type="email"
                  value={values.email}
                  error={errors.email}
                  onChange={(value) => updateField('email', value)}
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={values.phone}
                  error={errors.phone}
                  onChange={(value) => updateField('phone', value)}
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Message"
                    value={values.message}
                    error={errors.message}
                    onChange={(value) => updateField('message', value)}
                    textarea
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Submit Message
              </button>
              {submitted && (
                <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  Thank you! Your message has been received.
                </p>
              )}
              {!submitted && formIsFilled && (
                <p className="mt-4 text-sm text-slate-500">
                  Your information is only used to respond to this request.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-navy px-5 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-bold">Your Company</p>
            <p className="mt-2 text-blue-100">
              Modern websites that help small businesses earn more leads.
            </p>
          </div>
          <div className="text-sm leading-7 text-blue-100 md:text-right">
            <p>info@yourcompany.com</p>
            <p>(555) 123-4567</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  value,
  error,
  onChange,
  type = 'text',
  textarea = false,
}: {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  const baseClasses =
    'mt-2 w-full rounded-lg border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100';
  const borderClass = error ? 'border-red-300' : 'border-slate-300';

  return (
    <label className="block text-sm font-semibold text-navy" htmlFor={id}>
      {label}
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClasses} ${borderClass} resize-none`}
          placeholder="Tell us about your project"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClasses} ${borderClass}`}
          placeholder={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <span id={`${id}-error`} className="mt-2 block text-sm font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

export default App;
