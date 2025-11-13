"use client";
import { useRef, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import ContactHeader from "./ContactHeader";
import ContactHero from "./ContactHero";
import ContactAbout from "./ContactAbout";
import ContactCard from "./ContactCard";
import ContactMap from "./ContactMap";
import Support from "../Support";
import { createContact } from "@/actions/contact.action";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  // Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (): Promise<void> => {
      const name = nameRef.current?.value.trim() || "";
      const email = emailRef.current?.value.trim() || "";
      const subject = subjectRef.current?.value.trim() || "";
      const message = messageRef.current?.value.trim() || "";

      if (!name || !email || !subject || !message) {
        toast.error("Please fill in all fields!");
      }

      const result = await createContact(name, email, subject, message);
      if (result?.status === "success") {
        toast.success("Message sent successfully!");
      }
      console.log(result);
    },
    onSuccess: () => {
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (subjectRef.current) subjectRef.current.value = "";
      if (messageRef.current) messageRef.current.value = "";
    },
    onError: (err: unknown) => {
      console.error(err);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <ContactHeader />
      <main className="px-4 md:px-0">
        <ContactHero />
        <ContactAbout />

        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-[38px] font-medium text-center text-[#121212] mb-10 font-poppins">
              Contact Us
            </h2>

            <ContactCard />

            <div className="flex flex-col md:flex-row gap-10">
              {/* Form Section */}
              <div className="flex-1">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6C7275] mb-2 font-inter">
                      Full Name
                    </label>
                    <input
                      ref={nameRef}
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
                      ref={emailRef}
                      type="email"
                      placeholder="Your Email"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6C7275] mb-2 font-inter">
                      Subject
                    </label>
                    <input
                      ref={subjectRef}
                      type="text"
                      placeholder="Subject"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-[#6C7275] mb-2 font-inter">
                      Message
                    </label>
                    <textarea
                      ref={messageRef}
                      placeholder="Your message"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 min-h-[150px] resize-y focus:outline-none focus:ring-2 focus:ring-gray-800 font-inter"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className={`bg-gray-900 text-white px-8 py-2 rounded-md font-medium hover:bg-black transition font-inter cursor-pointer ${
                      isPending ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Map Section */}
              <div className="flex-1 overflow-hidden">
                <ContactMap />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Support />
      <ToastContainer />
    </>
  );
};

export default Contact;
