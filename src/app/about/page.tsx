import SectionDivider from "@/components/ui/sectionDivider";

const About = () => {
  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">About Rose &amp; Sugar</h1>

          <div className="flex flex-col lg:flex-row gap-12 items-center pt-8">
            {/* Left Column */}
            <div className="w-full lg:w-1/2">
              <div className="image-highlight">
                <img
                  src="/meganAbout.webp"
                  alt="Megan decorating cookies"
                  className="image-wrapper"
                />
              </div>

              <div className="mt-8 bg-bakery-pink-light/30 p-6 rounded-lg">
                <p className="body-text-large italic text-center text-bakery-pink-dark">
                  &quot;As a planner at heart, I know how important the small
                  details are and I love sharing my passion for events and
                  celebrating life&apos;s most special moments by creating
                  thoughtful and detailed cookies for all occasions!&quot;
                </p>
                <p className="text-right mt-2">&mdash; Megan</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2">
              <span className="mt-4 inline-block bg-bakery-pink-light text-bakery-pink-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
                The Story Behind Rose &amp; Sugar
              </span>

              <h2 className="section-subheading">Meet Megan Guerra</h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Hi there! I&apos;m Megan, your local cookie baker and
                  decorator extraordinaire, and owner of Rose &amp; Sugar. Born
                  and raised in the Sacramento area, I&apos;m excited to share
                  my passion with our community and create thoughtful and
                  beautiful cookies for your life&apos;s special occasions.
                </p>

                <p>
                  I have always had a love for creating, whether through arts
                  and crafts or baking. It wasn&apos;t until the year 2020 that
                  I stumbled upon the art of cookie decorating &amp; the rest
                  was history! Just like many others during the pandemic, I
                  embraced this newfound hobby of decorating, as it truly gave
                  me a creative outlet and ease of anxiety I was looking for. I
                  always say, you don&apos;t choose the cookie life, the cookie
                  life chooses you… and it sure did!
                </p>

                <p>
                  What started as a hobby baking for friends and family has
                  blossomed into a small business, I am so proud of today! Now
                  after almost five years of decorating, I&apos;ve decided to
                  share my passion not just through custom orders, but also by
                  teaching others. There&apos;s something magical about watching
                  people discover their own creativity while decorating cookies
                  in my small-group classes.
                </p>

                <p>
                  Each Rose &amp; Sugar cookie is handcrafted with love,
                  attention to detail, and a touch of whimsy. Whether I&apos;m
                  creating a custom set for your baby shower or guiding you
                  through your first piping technique, my goal is always the
                  same &mdash; to bring a little extra sweetness and beauty to
                  your day. Thank you for trusting me and letting me be a part
                  of celebrating your special moments!
                </p>
              </div>
              <SectionDivider icon="chefHat" />
              <div className="mt-8">
                <h3 className="section-subheading">
                  The Rose &amp; Sugar Difference
                </h3>
                <ul className="feature-list">
                  <li>
                    Small-batch, made-to-order cookies for maximum freshness
                  </li>
                  <li>Custom designs created just for your special occasion</li>
                  <li>Floral-inspired details and feminine touches</li>
                  <li>Intimate, beginner-friendly decorating classes</li>
                  <li>Local ingredients whenever possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
