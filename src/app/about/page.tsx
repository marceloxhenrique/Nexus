export default function About() {
  return (
    <main className="max-w-3xl grow py-12">
      <h1 className="text-3xl font-bold text-custom-text-primary">
        About Nexus
      </h1>
      <p className="mt-2 text-custom-text-light">
        Discover our mission and vision.
      </p>
      <section className="mt-6 space-y-4 text-custom-text-light">
        <p>
          <strong>Nexus</strong> is a blogging platform designed to empower
          writers, developers, and creatives by providing a space to share their
          thoughts, ideas, and expertise.
        </p>
        <p>
          We believe in fostering a community where knowledge is freely
          exchanged and innovation thrives. Whether you're here to learn, teach,
          or simply explore, Nexus is built to support and inspire you.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          Our Mission
        </h2>
        <p className="mt-2 text-custom-text-light">
          Our mission is to make content creation accessible and enjoyable for
          everyone. We provide a seamless and intuitive platform that encourages
          meaningful discussions and knowledge sharing.
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          Why Nexus?
        </h2>
        <ul className="mt-2 list-inside list-disc text-custom-text-light">
          <li>A clean and distraction-free writing experience.</li>
          <li>Seamless authentication via Google, GitHub, or email.</li>
          <li>A growing community of passionate writers and readers.</li>
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-custom-text-primary">
          Get Involved
        </h2>
        <p className="mt-2 text-custom-text-light">
          Whether you want to contribute articles, suggest features, or
          collaborate, we’d love to hear from you. Contact us at{" "}
          <strong>marcelodasilva.dev@gmail.com</strong>.
        </p>
      </section>
      <section className="mt-8">
        <p className="mt-4 text-custom-text-light">
          Thank you for being part of <strong>Nexus</strong>—where ideas
          connect.
        </p>
      </section>
    </main>
  );
}
