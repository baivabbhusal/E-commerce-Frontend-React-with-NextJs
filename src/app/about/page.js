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
      <section className="py-16 bg-gradient-to-r from-primary to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Our Company
              </h1>
              <p className="text-lg mb-8 opacity-90">
                We&apos;re a team of passionate individuals dedicated to delivering
                exceptional solutions for our clients worldwide. Our mission is
                to simplify complexity and drive innovation.
              </p>
              <a
                href="#contact"
                className="bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition inline-block"
              >
                Get in Touch
              </a>
            </div>
            <div className="md:w-2/5">
              <div className="bg-white/20 p-6 rounded-xl shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">500+</p>
                    <p>Happy Clients</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">50+</p>
                    <p>Projects</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">99%</p>
                    <p>Quality Product</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold">5+</p>
                    <p>Team Members</p>
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
                From Humble Beginnings to Industry Leaders
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2025, our company started as a small team with a big
                vision. We believed that technology could solve complex business
                problems in elegant ways.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Over the years, we&apos;ve grown into a diverse team of experts
                specializing in various domains. Our commitment to quality and
                customer satisfaction has been the driving force behind our
                success.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to innovate and expand our services while
                maintaining the personal touch that our clients appreciate.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-100 dark:bg-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-300 dark:text-gray-300 max-w-2xl mx-auto">
              Our talented team of professionals brings diverse expertise and
              passion to every project we undertake.
            </p>
            <div className="h-1 w-20 bg-secondary mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={baivabImage}
                alt="Team Member"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Baivab Bhusal
                </h3>
                <p className="text-primary font-medium">CEO &amp; Founder</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Visionary leader with 1+ years of industry experience.
                </p>
                <div className="flex mt-4 space-x-4">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fas fa-envelope" />
                  </a>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={gandhiImage}
                alt="Team Member"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Gandhi Raj Giri
                </h3>
                <p className="text-primary font-medium">Lead Designer</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Creative mind behind our award-winning designs.
                </p>
                <div className="flex mt-4 space-x-4">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-behance" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fas fa-envelope" />
                  </a>
                </div>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={ujjwalImage}
                alt="Team Member"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Ujjwal Bhusal
                </h3>
                <p className="text-primary font-medium">Sales Manager</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Ensures our products are visible in market.
                </p>
                <div className="flex mt-4 space-x-4">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-github" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fas fa-envelope" />
                  </a>
                </div>
              </div>
            </div>
            {/* Team Member 4 */}
            <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Image
                src={nirjakImage}
                alt="Team Member"
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Nirjak Bhattarai
                </h3>
                <p className="text-primary font-medium">Marketing Director</p>
                <p className="text-gray-600 mt-2">
                  Drives our brand presence and customer engagement.
                </p>
                <div className="flex mt-4 space-x-4">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-linkedin" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-primary transition"
                  >
                    <i className="fas fa-envelope" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
