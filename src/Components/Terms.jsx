import React from "react";
import { FaExternalLinkAlt, FaLock, FaFileContract, FaExchangeAlt } from "react-icons/fa";

const Terms = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen text-gray-200 bg-[#0a0a0a]">

      {/* Sticky Top Buttons */}
      <nav className="sticky top-0 z-40 bg-[#111] bg-opacity-95 backdrop-blur-sm shadow-lg p-3 mb-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">

          <button
            onClick={() => scrollToSection("privacy-policy")}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <FaLock />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => scrollToSection("terms-conditions")}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full text-indigo-300 bg-[#1a1a1a] hover:bg-[#222] transition-colors shadow-md"
          >
            <FaFileContract />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => scrollToSection("refund-cancellation")}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full text-indigo-300 bg-[#1a1a1a] hover:bg-[#222] transition-colors shadow-md"
          >
            <FaExchangeAlt />
            <span>Refund Policy</span>
          </button>

          <button
            onClick={() => scrollToSection("razorpay-links")}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full text-green-300 bg-[#142d14] hover:bg-[#1e3a1e] transition-colors shadow-md hidden sm:flex"
          >
            <FaExternalLinkAlt />
            <span>Razorpay Policy Links</span>
          </button>

        </div>
      </nav>

      <div className="p-4 sm:p-6 max-w-6xl mx-auto">

        {/* PRIVACY POLICY */}
        <section
          id="privacy-policy"
          className="mb-12 p-6 bg-[#111] rounded-xl shadow-2xl border border-gray-800 transition-shadow duration-300 hover:shadow-xl"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-indigo-400 flex items-center">
            <FaLock className="mr-3" />
            Privacy Policy – Tindev
          </h1>
          <p className="text-sm text-gray-500 mb-4 border-b border-gray-700 pb-2">
            Last updated: [6/11/2025]
          </p>
          <p className="mb-6 leading-relaxed text-gray-300">
            Tindev (“we”, “our”, “us”) operates the website{" "}
            <a
              href="https://www.tindev.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              https://www.tindev.fun
            </a>{" "}
            (“Platform”). This *Privacy Policy* explains how we collect, use, and protect your personal data.
          </p>

          <div className="space-y-6">

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <h2 className="text-2xl font-bold mt-2 text-indigo-400">
                1. Information We Collect
              </h2>
              <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-300">
                <li>*Personal details:* Name, email (if provided), phone (if provided), profile details.</li>
                <li>*Usage data:* IP address, browser type, pages visited, interactions.</li>
                <li>*Payment data:* Processed securely by Razorpay. We do not store card/UPI details.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-300">
                <li>To *provide and improve* Tindev features.</li>
                <li>To process payments via *Razorpay*.</li>
                <li>For support and *security purposes*.</li>
                <li>To prevent fraud or unauthorized access.</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">3. Cookies & Tracking</h2>
              <p className="mt-2 text-gray-300">
                We use *cookies* to improve user experience. You may disable them in your browser.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">4. Third-Party Services</h2>
              <ul className="list-disc ml-8 mt-2 space-y-1 text-gray-300">
                <li>*Razorpay* – Payment processing</li>
                <li>*Analytics tools* – Usage tracking</li>
              </ul>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">5. Data Security</h2>
              <p className="mt-2 text-gray-300">
                We use *encryption, secure servers*, and restricted access.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">6. Your Rights</h2>
              <p className="mt-2 text-gray-300">You can request access, update, or deletion of your data.</p>
              <p className="mt-4 font-semibold text-gray-300">
                📧 Email:{" "}
                <a href="mailto:11.editzs@gmail.com" className="text-indigo-400 hover:underline">
                  11.editzs@gmail.com
                </a>{" "}
                | 📞 Support:{" "}
                <a href="tel:+919403785622" className="text-indigo-400 hover:underline">
                  +91 9403785622
                </a>
              </p>
            </div>

          </div>
        </section>

        {/* TERMS & CONDITIONS */}
        <section
          id="terms-conditions"
          className="mb-12 p-6 bg-[#111] rounded-xl shadow-2xl border border-gray-800 transition-shadow duration-300 hover:shadow-xl"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-indigo-400 flex items-center">
            <FaFileContract className="mr-3" />
            Terms & Conditions – Tindev
          </h1>

          <p className="text-sm text-gray-500 mb-4 border-b border-gray-700 pb-2">
            Last Updated: [6/11/2025]
          </p>

          <div className="space-y-6">

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">1. Use of Service</h2>
              <p className="mt-2 text-gray-300">
                Tindev provides developer-focused features and premium tools.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">2. Accounts</h2>
              <p className="mt-2 text-gray-300">
                You are responsible for maintaining confidentiality of your login info.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">3. Payments</h2>
              <p className="mt-2 text-gray-300">
                Payments are securely handled via Razorpay.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">4. Refunds</h2>
              <p className="mt-2 text-gray-300">
                Cancellation allowed within *24 hours*. Refund in 5–7 days.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">5. Contact</h2>
              <p className="mt-2 font-semibold text-gray-300">
                📧 Email:{" "}
                <a href="mailto:11.editzs@gmail.com" className="text-indigo-400 hover:underline">
                  11.editzs@gmail.com
                </a>{" "}
                | 📞 Support:{" "}
                <a href="tel:+919403785622" className="text-indigo-400 hover:underline">
                  +91 9403785622
                </a>
              </p>
            </div>

          </div>
        </section>

        {/* REFUND POLICY */}
        <section
          id="refund-cancellation"
          className="mb-12 p-6 bg-[#111] rounded-xl shadow-2xl border border-gray-800 transition-shadow duration-300 hover:shadow-xl"
        >
          <h1 className="text-4xl font-extrabold mb-4 text-indigo-400 flex items-center">
            <FaExchangeAlt className="mr-3" />
            Refund & Cancellation Policy – Tindev
          </h1>

          <p className="text-sm text-gray-500 mb-4 border-b border-gray-700 pb-2">
            Last Updated: [11/6/2025]
          </p>

          <div className="space-y-6">

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">1. Eligibility</h2>
              <p className="mt-2 text-gray-300">Refunds allowed within *24 hours* of purchase.</p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">2. Refund Process</h2>
              <p className="mt-2 text-gray-300">
                Email your transaction details to{" "}
                <a href="mailto:11.editzs@gmail.com" className="text-indigo-400 hover:underline">
                  11.editzs@gmail.com
                </a>.
              </p>
            </div>

            <div className="p-4 bg-[#0f0f0f] rounded-lg">
              <h2 className="text-2xl font-bold text-indigo-400">3. Digital Services</h2>
              <p className="mt-2 text-gray-300">
                Tindev provides digital services only — no shipping involved.
              </p>
            </div>

          </div>
        </section>

        {/* Razorpay Policy Links */}
        <section
          id="razorpay-links"
          className="bg-[#141414] p-6 rounded-xl shadow-inner border border-gray-800"
        >
          <h2 className="text-3xl font-bold mb-5 text-indigo-400">
            Payment & Razorpay Policy Links
          </h2>
          <p className="text-md text-gray-400 mb-4">
            These policies are hosted by Razorpay as the payment partner.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "Shipping Policy (Razorpay)",
                link: "https://merchant.razorpay.com/policy/Rc6wU53TEm4Jdi/shipping",
              },
              {
                title: "Cancellation & Refund Policy (Razorpay)",
                link: "https://merchant.razorpay.com/policy/Rc6wU53TEm4Jdi/refund",
              },
              {
                title: "Terms & Conditions (Razorpay)",
                link: "https://merchant.razorpay.com/policy/Rc6wU53TEm4Jdi/terms",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center bg-[#1a1a1a] px-5 py-4 rounded-xl border border-gray-700 hover:bg-[#222] hover:border-indigo-500 text-indigo-300 font-medium transition-all duration-300 group"
              >
                <span>{item.title}</span>
                <FaExternalLinkAlt
                  size={16}
                  className="text-indigo-400 group-hover:text-indigo-500 transition-colors"
                />
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Terms;
