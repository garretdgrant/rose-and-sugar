import { Flower } from "lucide-react";

const About = () => {
  return (
    <div className="page-wrapper">
      <main className="page-content">
        <div className="container-custom">
          <h1 className="page-heading">About Rose &amp; Sugar</h1>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="image-highlight">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d"
                  alt="Megan decorating cookies"
                  className="image-wrapper"
                />
              </div>

              <div className="mt-8 bg-bakery-pink-light/30 p-6 rounded-lg">
                <p className="body-text-large italic text-center text-bakery-pink-dark">
                  &quot;I believe every celebration deserves something sweet,
                  and every cookie tells its own story.&quot;
                </p>
                <p className="text-right mt-2">&mdash; Megan</p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <span className="inline-block bg-bakery-pink-light text-bakery-pink-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
                The Story Behind Rose &amp; Sugar
              </span>

              <h2 className="section-subheading">Meet Megan Guerra</h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Hello! I&apos;m Megan, the cookie artist and founder behind
                  Rose &amp; Sugar. Born and raised in Folsom, I&apos;ve always
                  had a passion for creating beautiful things with my hands
                  &mdash; from floral arrangements to hand-lettering, and
                  eventually, cookie decorating.
                </p>

                <p>
                  What started as a hobby baking for friends and family has
                  blossomed into a boutique cookie studio where I get to create
                  edible art for life&apos;s special moments. I draw inspiration
                  from flowers, seasonality, and the joy of celebration.
                </p>

                <p>
                  After years of perfecting my recipes and techniques, I decided
                  to share my passion not just through custom orders, but also
                  by teaching others. There&apos;s something magical about
                  watching people discover their own creativity while decorating
                  cookies in my small-group classes.
                </p>

                <p>
                  Each Rose &amp; Sugar cookie is handcrafted with love,
                  attention to detail, and a touch of whimsy. Whether I&apos;m
                  creating a custom set for your baby shower or guiding you
                  through your first piping technique, my goal is always the
                  same &mdash; to bring a little extra sweetness and beauty to
                  your day.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <div className="h-px bg-bakery-pink-light flex-grow"></div>
                <Flower size={24} className="mx-4 text-bakery-pink" />
                <div className="h-px bg-bakery-pink-light flex-grow"></div>
              </div>

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
