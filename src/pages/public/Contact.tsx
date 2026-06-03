import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Contact = () => {
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
              className="w-full border border-border rounded-xl px-4 py-3"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-border rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full border border-border rounded-xl px-4 py-3"
            />

            <button className="btn-primary w-full py-3">
              Send Message
            </button>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;