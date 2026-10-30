import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "../../services/authService";
import { useToast } from "../../components/Toast";

const Contact = () => {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please complete all fields");
      return;
    }
    try {
      setSending(true);
      await sendContactMessage(form);
      setForm({ name: "", email: "", message: "" });
      toast.success("Your message has been sent successfully");
    } catch (error: unknown) {
      const response =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (error as {
              response?: {
                data?: {
                  error?: unknown;
                };
              };
            }).response
          : undefined;
      toast.error(
        typeof response?.data?.error === "string"
          ? response.data.error
          : "Unable to send your message",
      );
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="bg-background">

      <section className="text-center py-8 px-4 fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Let's Talk
        </h1>

        <p className="text-muted mt-4">
          We’d love to hear from you. Let’s connect and build better hiring experiences together.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-4 grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-6 fade-up">

          <div className="card p-5 flex items-center gap-4">
            <Mail className="text-primary" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-muted">
                support@hireup.com
              </p>
            </div>
          </div>

          <div className="card p-5 flex items-center gap-4">
            <Phone className="text-primary" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p className="text-muted">
                +94 77 123 4567
              </p>
            </div>
          </div>

          <div className="card p-5 flex items-center gap-4">
            <MapPin className="text-primary" />
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-muted">
                Jaffna, Sri Lanka
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="card p-8 fade-up">

          <h2 className="text-2xl font-bold mb-6">
            Send Message
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full border border-border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full border border-border rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="w-full border border-border rounded-xl px-4 py-3"
            />

            <button onClick={submit} disabled={sending} className="btn-primary w-full py-3 cursor-pointer disabled:opacity-50">
              {sending ? "Sending..." : "Send Message"}
            </button>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;