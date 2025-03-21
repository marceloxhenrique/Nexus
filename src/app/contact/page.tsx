export default function Contact() {
  return (
    <main className="max-w-3xl grow py-12">
      <h1 className="text-3xl font-bold text-custom-text-primary">
        Contact Us
      </h1>
      <p className="mt-2 text-custom-text-light">We’d love to hear from you!</p>
      <section className="mt-6 space-y-4 text-custom-text-light">
        <p>
          Whether you have a question, feedback, or just want to say hello, feel
          free to reach out.
        </p>
        <p>
          You can contact us directly via email or through our social media
          channels.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          Get in Touch
        </h2>
        <ul className="mt-4 space-y-2 text-custom-text-light">
          <li>
            <strong>Email: </strong>
            <a
              href="mailto:marcelodasilva.dev@gmail.com"
              className="text-custom-text-primary hover:underline"
            >
              marcelodasilva.dev@gmail.com
            </a>
          </li>
          <li>
            <strong>Twitter: </strong>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-custom-text-primary hover:underline"
            >
              @Nexus
            </a>
          </li>
          <li>
            <strong>LinkedIn: </strong>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-custom-text-primary hover:underline"
            >
              Nexus on LinkedIn
            </a>
          </li>
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          Follow Us
        </h2>
        <p className="mt-2 text-custom-text-light">
          Stay updated with our latest news and articles by following us on
          social media.
        </p>
      </section>
      <p className="mt-8 text-custom-text-light">
        We appreciate your interest in <strong>Nexus</strong> and look forward
        to connecting with you!
      </p>
    </main>
  );
}
