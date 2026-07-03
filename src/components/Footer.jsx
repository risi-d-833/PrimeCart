import {
  Globe,
  Share2,
  Users,
  Video,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  CreditCard,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F1EDE5] pt-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Main Footer */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[#DDD5C9]">

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold text-[#222] mb-6">
              Company
            </h3>

            <ul className="space-y-4">

              {[
                "About Us",
                "Contact Us",
                "Privacy Policy",
                "Terms & Conditions",
                "Support Center",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-gray-600 hover:text-[#B8864A] transition"
                  >
                    <ChevronRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* Questions */}

          <div>

            <h3 className="text-xl font-bold text-[#222] mb-6">
              Questions?
            </h3>

            <ul className="space-y-4">

              {[
                "Help Support",
                "Track Order",
                "Return Policy",
                "Shipping Info",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-gray-600 hover:text-[#B8864A] transition"
                  >
                    <ChevronRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* Useful Links */}

          <div>

            <h3 className="text-xl font-bold text-[#222] mb-6">
              Useful Links
            </h3>

            <ul className="space-y-4">

              {[
                "Gift Cards",
                "Size Chart",
                "My Account",
                "Store Location",
                "Offers",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-gray-600 hover:text-[#B8864A] transition"
                  >
                    <ChevronRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold text-[#222] mb-6">
              Connect With Us
            </h3>

            {/* Social */}

            <div className="flex gap-3 mb-8">

              {[
                Globe,
                Share2,
                Users,
                Video,
                Mail,
              ].map((Icon, index) => (
                <button
                  key={index}
                  className="h-10 w-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#B8864A] hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </button>
              ))}

            </div>

            {/* Address */}

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin
                  className="text-[#B8864A]"
                  size={18}
                />

                <p className="text-gray-600 text-sm">
                  123 Fashion Street,
                  <br />
                  Indore, India
                </p>

              </div>

              <div className="flex gap-3">

                <Mail
                  className="text-[#B8864A]"
                  size={18}
                />

                <p className="text-gray-600 text-sm">
                  support@PrimeCart.com
                </p>

              </div>

              <div className="flex gap-3">

                <Phone
                  className="text-[#B8864A]"
                  size={18}
                />

                <p className="text-gray-600 text-sm">
                  +91 98765 43210
                </p>

              </div>

            </div>

          </div>

        </div>        {/* Bottom Footer */}

        <div className="py-10">

          {/* Payment Methods */}

          <div className="flex flex-wrap justify-center gap-4 mb-8">

            {[
              "PayPal",
              "Visa",
              "MasterCard",
              "Apple Pay",
              "Google Pay",
            ].map((card) => (
              <div
                key={card}
                className="flex items-center gap-2 rounded-lg bg-white border border-[#E5DDD1] px-5 py-3 shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1"
              >
                <CreditCard
                  size={18}
                  className="text-[#B8864A]"
                />

                <span className="text-sm font-medium text-gray-700">
                  {card}
                </span>

              </div>
            ))}

          </div>

          {/* Trust Badges */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

            {[
              {
                title: "Secure Payment",
                desc: "100% Protected",
              },
              {
                title: "Fast Delivery",
                desc: "Worldwide Shipping",
              },
              {
                title: "Easy Returns",
                desc: "30 Days Return",
              },
              {
                title: "24/7 Support",
                desc: "Always Available",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white border border-[#E5DDD1] p-5 text-center shadow-sm hover:shadow-lg transition duration-300"
              >
                <h4 className="font-semibold text-[#222]">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>

          {/* Divider */}

          <div className="border-t border-[#DDD5C9] pt-6">

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

              <p className="text-sm text-gray-500 text-center md:text-left">
                © 2026 <span className="font-semibold text-[#B8864A]">PRIMECART</span>.
                All Rights Reserved.
              </p>

              <div className="flex gap-6 text-sm text-gray-500">

                <a
                  href="#"
                  className="hover:text-[#B8864A] transition"
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="hover:text-[#B8864A] transition"
                >
                  Terms
                </a>

                <a
                  href="#"
                  className="hover:text-[#B8864A] transition"
                >
                  Cookies
                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}