import nirjakImage from "@/assets/images/members/nirjak.jpeg";
import baivabImage from "@/assets/images/members/baivab.jpeg";
import gandhiImage from "@/assets/images/members/gandhi.jpeg";
import ujjwalImage from "@/assets/images/members/ujjwal.jpg";
import groupImage from "@/assets/images/members/group.jpg";
import Image from "next/image";

export const metadata = {
  title: "About",
};

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-primary to-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Rooted in Nature, Grown with Love
              </h1>
              <p className="text-lg mb-8 opacity-90">
                We are a passionate team of plant lovers bringing the beauty of
                nature straight to your doorstep. From lush indoor greens to
                vibrant flowering plants, we carefully select every plant to
                help your space breathe and bloom.
              </p>
              <a
                href="/contact"
                className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition inline-block"
              >
                Get in Touch
              </a>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/20 p-6 rounded-xl shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">1,200+</p>
                    <p>Happy Plant Parents</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">300+</p>
                    <p>Plant Varieties</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">100%</p>
                    <p>Naturally Grown</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">4</p>
                    <p>Founding Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 dark:bg-gray-800 dark:text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Our Story</h2>
            <div className="h-1 w-20 bg-secondary mx-auto" />
          </div>
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <Image
                src={groupImage}
                alt="Our Team"
                className="rounded-lg shadow-md w-full h-100 object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                From a Small Garden to Your Home
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2025, Green Roots began as a small backyard nursery
                with a simple dream — to share the joy of plants with everyone.
                We believed every home deserves a touch of green, and every
                person deserves a plant that fits their lifestyle.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Over time, our little garden grew into a curated plant store
                offering everything from easy-care succulents and air-purifying
                indoor plants to rare tropical varieties and seasonal flowers.
                Each plant is nurtured with care before it reaches you.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to grow — not just in the number of plants
                we offer, but in our community of plant lovers who share our
                love for greener, happier living spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-green-50 dark:bg-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose Green Roots?
            </h2>
            <div className="h-1 w-20 bg-secondary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Farm-Fresh Plants</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Every plant is sourced directly from trusted local nurseries and
                our own growing spaces — no middlemen, no wilted surprises.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Safe Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Plants are packed with eco-friendly materials designed to keep
                them safe, stable and stress-free during their journey to you.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Plant Care Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Not sure how to care for your new plant? Our team is always
                ready to help with watering tips, sunlight advice, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We are a small but passionate group of plant enthusiasts who care
              deeply about nature and the people we serve.
            </p>
            <div className="h-1 w-20 bg-secondary mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={baivabImage}
                alt="Baivab Bhusal"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Baivab Bhusal</h3>
                <p className="text-primary font-medium text-sm">Founder & Head Grower</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  The green thumb behind Green Roots — Baivab started this
                  journey from a single balcony garden.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={gandhiImage}
                alt="Gandhi Raj Giri"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Gandhi Raj Giri</h3>
                <p className="text-primary font-medium text-sm">Plant Curator</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  Gandhi handpicks each variety we carry, ensuring only the
                  healthiest and most beautiful plants make the cut.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={ujjwalImage}
                alt="Ujjwal Bhusal"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Ujjwal Bhusal</h3>
                <p className="text-primary font-medium text-sm">Customer Relations</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  Ujjwal makes sure every plant parent feels supported — from
                  first purchase to first bloom.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={nirjakImage}
                alt="Nirjak Bhattarai"
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Nirjak Bhattarai</h3>
                <p className="text-primary font-medium text-sm">Delivery & Packaging</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  Nirjak ensures every plant arrives safely, on time, and
                  looking as good as when it left our nursery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
