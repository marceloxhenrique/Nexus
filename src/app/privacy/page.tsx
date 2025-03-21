export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl py-12">
      <h1 className="text-3xl font-bold text-custom-text-primary">
        Privacy Policy
      </h1>
      <p className="mt-2 text-custom-text-light">Last updated: March 2025</p>
      <section className="mt-6 space-y-4 text-custom-text-light">
        <p>
          Welcome to <strong>Nexus</strong>. Your privacy is important to us.
          This page explains what data we collect, how we use it, and your
          rights under the
          <strong> General Data Protection Regulation (GDPR)</strong>.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          1. Data We Collect
        </h2>
        <p className="mt-2 text-custom-text-light">
          When you use Nexus, we collect only the necessary data for
          authentication and site functionality:
        </p>
        <ul className="mt-2 list-inside list-disc text-custom-text-light">
          <li>
            <strong>Google or GitHub login:</strong> Name, email, and profile
            picture (if available).
          </li>
          <li>
            <strong>Email and password login:</strong> Email address and
            encrypted password.
          </li>
        </ul>
        <p className="mt-2 text-custom-text-light">
          We do not collect sensitive data or share your information with third
          parties.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          2. How We Use Your Data
        </h2>
        <p className="mt-2 text-custom-text-light">
          Your data is used exclusively for:
        </p>
        <ul className="mt-2 list-inside list-disc text-custom-text-light">
          <li>Logging in and accessing Nexus.</li>
          <li>
            Personalizing your experience (display name, profile picture, etc.).
          </li>
          <li>Maintaining security and site functionality.</li>
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          3. Cookies and Tracking
        </h2>
        <p className="mt-2 text-custom-text-light">
          Nexus uses cookies to improve your experience:
        </p>
        <ul className="mt-2 list-inside list-disc text-custom-text-light">
          <li>
            <strong>Essential cookies:</strong> Required for authentication and
            basic site functionality.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us analyze website usage
            (if enabled).
          </li>
        </ul>
        <p className="mt-2 text-custom-text-light">
          You can manage cookie preferences in your browser settings.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          4. Your Rights
        </h2>
        <p className="mt-2 text-custom-text-light">
          Under GDPR, you have the right to:
        </p>
        <ul className="mt-2 list-inside list-disc text-custom-text-light">
          <li>Access, modify, or delete your data.</li>
          <li>Request a copy of your data.</li>
          <li>Withdraw consent for data processing.</li>
        </ul>
        <p className="mt-2 text-custom-text-light">
          To exercise these rights, contact us at
          <strong> marcelodasilva.dev@gmail.com</strong>.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          5. Contact
        </h2>
        <p className="mt-2 text-custom-text-light">
          If you have any questions, feel free to reach out to us at
          <strong> marcelodasilva.dev@gmail.com</strong>.
        </p>
        <p className="mt-4 text-custom-text-light">
          Thank you for using <strong>Nexus</strong>!
        </p>
      </section>
    </main>
  );
}
