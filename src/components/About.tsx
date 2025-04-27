const About = () => {
  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-white to-bakery-pink-light/70"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-2/5">
            <div className="relative">
              <div className="bg-bakery-peach absolute -bottom-4 -left-4 w-full h-full rounded-lg -z-10"></div>
              <img
                src="/roseSugarClassCropped.webp"
                alt="Megan decorating cookies"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-3/5">
            <span className="inline-block bg-bakery-pink-light text-bakery-pink-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
              Meet Your Cookie Artist
            </span>
            <h2 className="section-heading text-left mb-4">
              Creating Sweet Memories
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Hi, I&apos;m Megan — Sacramento area native, cookie artist, and
              the creative heart behind Rose & Sugar. Every cookie is crafted
              with love and decorated with a floral-inspired touch that makes
              each order uniquely special ✨
            </p>
            <p className="text-gray-700 text-lg mb-6">
              What started as a passion for creating beautiful treats has
              blossomed into this thriving small business where I get to share
              the joy of cookie decorating through both custom orders and
              intimate classes.
            </p>
            <p className="text-gray-600 font-medium italic">
              &quot;I truly believe cookies can make a huge difference in any
              celebration & make anyone smile!&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
