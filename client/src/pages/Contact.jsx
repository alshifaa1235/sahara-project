import { useState } from "react";
import "./Contact.css";

const CONTACT_INFO = [
  { mark: "✦", label: "Email",    value: "hello@sahara.co",       note: "We reply within 24 hours" },
  { mark: "◈", label: "Phone",    value: "+1 (555) 012-3456",     note: "Mon–Fri, 9am–6pm GMT" },
  { mark: "◇", label: "Address",  value: "12 Medina Quarter, Marrakech", note: "Visits by appointment" },
];

const FAQS = [
  { q: "How long does shipping take?",   a: "Standard shipping takes 5–8 business days. Express (2–3 days) is available at checkout. Free standard shipping on all orders over $200." },
  { q: "What is your returns policy?",   a: "We accept returns within 30 days of delivery for unworn, unwashed items in original packaging. Leather goods are final sale unless faulty." },
  { q: "Do you ship internationally?",   a: "Yes — we ship to 40+ countries. International delivery typically takes 8–14 business days. Import duties may apply." },
  { q: "How do I care for linen items?", a: "Machine wash cold on a gentle cycle, line dry where possible. Linen softens beautifully with each wash — minor creasing is part of its character." },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq,   setOpenFaq]   = useState(null);

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="contact-hero">
        <div className="container">
          <p className="eyebrow contact-hero__eyebrow">Get in Touch</p>
          <h1 className="display-lg contact-hero__title">We'd love to hear from you.</h1>
          <p className="contact-hero__sub">
            Questions about an order, a product, or just want to say hello — we're here.
          </p>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────── */}
      <section className="section contact-section">
        <div className="container contact-grid">

          {/* Form */}
          <div className="contact-form-wrap fade-up">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__mark">✦</div>
                <h2 className="contact-success__title">Message received.</h2>
                <p className="contact-success__body">
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="contact-form-wrap__heading">Send a message</h2>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label label" htmlFor="name">Full Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="input"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label label" htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="input"
                        placeholder="you@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label label" htmlFor="subject">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      className="input"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic…</option>
                      <option value="order">Order Enquiry</option>
                      <option value="product">Product Question</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="press">Press & Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="input contact-textarea"
                      placeholder="Tell us how we can help…"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg contact-submit">
                    Send Message →
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info sidebar */}
          <aside className="contact-info fade-up" style={{ animationDelay: "120ms" }}>
            <div className="contact-info__block">
              <p className="eyebrow contact-info__eyebrow">Contact Details</p>
              <div className="contact-info__items">
                {CONTACT_INFO.map(({ mark, label, value, note }) => (
                  <div key={label} className="contact-info__item">
                    <span className="contact-info__mark">{mark}</span>
                    <div>
                      <p className="contact-info__label eyebrow">{label}</p>
                      <p className="contact-info__value">{value}</p>
                      <p className="contact-info__note">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-info__block">
              <p className="eyebrow contact-info__eyebrow">Follow Along</p>
              <div className="contact-socials">
                {["Instagram", "Pinterest", "Twitter"].map((s) => (
                  <a key={s} href="#" className="contact-social">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="section contact-faq">
        <div className="container contact-faq__inner">
          <div>
            <p className="eyebrow">Quick answers</p>
            <h2 className="display-md" style={{ marginTop: "var(--space-2)" }}>
              Frequently Asked
            </h2>
          </div>
          <div className="faq-list">
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? "faq-item--open" : ""}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{q}</span>
                  <span className="faq-item__icon">{openFaq === i ? "−" : "+"}</span>
                </button>
                <div className="faq-item__answer">
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
