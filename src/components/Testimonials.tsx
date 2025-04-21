const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Megan's cookies are absolutely magical! She made the most beautiful set for my daughter's birthday party. Not only did they look stunning, but they tasted amazing too!",
      name: "Sarah J.",
      stars: 5,
    },
    {
      id: 2,
      text: "I took one of Megan's decorating classes with friends and it was SO much fun! She's patient, creative, and makes the whole experience enjoyable. Can't wait to go back!",
      name: "Lisa M.",
      stars: 5,
    },
    {
      id: 3,
      text: "The custom cookies Megan created for our baby shower were perfect. Everyone loved the delicate floral designs, and the packaging was beautiful. Highly recommend!",
      name: "Jessica & David",
      stars: 5,
    },
  ];

  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <section
      id="testimonials"
      className="section-padding bg-gradient-to-b to-white from-bakery-pink-light/70"
    >
      <div className="container-custom">
        <h2 className="section-heading">
          &quot;Megan&apos;s cookies are pure magic!&quot;
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex mb-4">{renderStars(testimonial.stars)}</div>
              <p className="text-gray-700 italic mb-6">
                &quot;{testimonial.text}&quot;
              </p>
              <p className="font-medium text-bakery-pink-dark">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
