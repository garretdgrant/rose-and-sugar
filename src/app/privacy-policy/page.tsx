import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Privacy Policy | Rose & Sugar Bakery",
    description:
      "Read the Rose & Sugar Bakery privacy policy covering information we collect, how we use it, and your rights.",
    path: "/privacy-policy",
  });
}

const PrivacyPolicyPage = () => {
  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <div className="content-container">
            <h1 className="page-heading">Privacy Policy</h1>
            <p className="text-center text-gray-700 font-medium">
              Rose &amp; Sugar Bakery
            </p>
            <p className="text-center text-gray-500 text-sm mt-2">
              Last updated: January 2026
            </p>

            <div className="space-y-8 mt-10 text-gray-700">
              <p className="body-text">
                Rose &amp; Sugar Bakery (&ldquo;Rose &amp; Sugar,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) values
                your privacy. This Privacy Policy explains how we collect, use,
                and protect your information when you visit our website, place
                an order, sign up for classes, or contact us.
              </p>
              <p className="body-text">
                By using our website, you agree to the practices described in
                this policy.
              </p>

              <section>
                <h2 className="section-subheading">Information We Collect</h2>
                <p className="body-text">
                  We may collect the following types of information:
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-fraunces text-xl text-gray-800 mb-2">
                      Personal Information You Provide
                    </h3>
                    <p className="body-text mb-3">When you:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Place an order</li>
                      <li>Sign up for a class or event</li>
                      <li>Fill out a contact form</li>
                      <li>Join our email list</li>
                    </ul>
                    <p className="body-text mt-4">You may provide:</p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Order or event details</li>
                      <li>
                        Any information you include in a message or inquiry
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-fraunces text-xl text-gray-800 mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="body-text">
                      When you visit our website, we may automatically collect:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                      <li>IP address</li>
                      <li>Browser type and device information</li>
                      <li>Pages visited and time spent on the site</li>
                      <li>Referring website or link</li>
                    </ul>
                    <p className="body-text mt-4">
                      This data helps us understand how visitors use our site
                      and improve the overall experience.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="section-subheading">
                  How We Use Your Information
                </h2>
                <p className="body-text">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>Process and fulfill orders</li>
                  <li>Register you for classes or events</li>
                  <li>Respond to inquiries and messages</li>
                  <li>Send order confirmations or important updates</li>
                  <li>Improve our website and services</li>
                  <li>
                    Communicate about offerings, events, or updates (only if you
                    opt in)
                  </li>
                </ul>
                <p className="body-text mt-4">
                  We do not sell, rent, or trade your personal information.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">
                  Cookies &amp; Tracking Technologies
                </h2>
                <p className="body-text">
                  Our website may use cookies or similar technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>Ensure the site functions properly</li>
                  <li>Analyze site traffic and performance</li>
                  <li>Improve user experience</li>
                </ul>
                <p className="body-text mt-4">
                  You can disable cookies through your browser settings, though
                  some features of the site may not function correctly.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">Third-Party Services</h2>
                <p className="body-text">
                  We may use trusted third-party services to support our website
                  and operations, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>Website hosting</li>
                  <li>Payment processing</li>
                  <li>Email communications</li>
                  <li>Analytics tools (such as Google Analytics)</li>
                </ul>
                <p className="body-text mt-4">
                  These third parties only have access to the information
                  necessary to perform their services and are required to
                  protect your data.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">Payment Information</h2>
                <p className="body-text">
                  If you make a purchase, payments are processed through secure
                  third-party payment providers. Rose &amp; Sugar does not store
                  or have access to your full payment card details.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">Data Security</h2>
                <p className="body-text">
                  We take reasonable measures to protect your personal
                  information from unauthorized access, disclosure, or misuse.
                  However, no method of transmission over the internet is 100%
                  secure.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">Children&apos;s Privacy</h2>
                <p className="body-text">
                  Rose &amp; Sugar does not knowingly collect personal
                  information from children under the age of 13. If you believe
                  a child has provided personal information through our site,
                  please contact us and we will promptly remove it.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">
                  Your Rights &amp; Choices
                </h2>
                <p className="body-text">You may:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                  <li>
                    Request access to the personal information we have about you
                  </li>
                  <li>Request corrections or updates</li>
                  <li>
                    Request deletion of your information (subject to legal or
                    operational requirements)
                  </li>
                  <li>
                    Opt out of marketing emails at any time by using the
                    unsubscribe link
                  </li>
                </ul>
                <p className="body-text mt-4">
                  To make a request, please contact us using the information
                  below.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">Changes to This Policy</h2>
                <p className="body-text">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated effective
                  date.
                </p>
              </section>

              <section>
                <h2 className="section-subheading">Contact Us</h2>
                <p className="body-text">
                  If you have questions about this Privacy Policy or how your
                  information is handled, please contact:
                </p>
                <div className="mt-4 space-y-1 text-gray-700">
                  <p className="font-medium">Rose &amp; Sugar Bakery</p>
                  <p>Folsom, CA</p>
                  <p>roseandsugarcookies@gmail.com</p>
                </div>
              </section>

              <p className="body-text">
                Thank you for trusting Rose &amp; Sugar. We appreciate your
                support and respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
