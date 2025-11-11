"use client";
import ContactHeader from "./ContactHeader";
import ContactHero from "./ContactHero";
import ContactAbout from "./ContactAbout";
import ContactCard from "./ContactCard";
import ContactMap from "./ContactMap";
import Support from "../Support";

const Contact = () => {
  return (
    <>
      <ContactHeader />
      {/* Hero Section */}
      <main className="px-4 md:px-0">
        <ContactHero />

        {/* About Section */}
        <ContactAbout />
        {/* Contact Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-[38px] font-medium text-center text-[#121212] mb-10 font-poppins">
              Contact Us
            </h2>

            {/* Contact Cards */}
            <ContactCard />
            {/* Contact Form + Map */}
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <form className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6C7275] mb-2 font-inter">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6C7275] mb-2 font-inter">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6C7275] mb-2 font-inter">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 min-h-[150px] resize-y focus:outline-none focus:ring-2 focus:ring-gray-800 font-inter"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-900 text-white px-8 py-2 rounded-md font-medium hover:bg-black transition font-inter cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div className="flex-1 overflow-hidden">
                <ContactMap />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Support />
    </>
  );
};

export default Contact;
