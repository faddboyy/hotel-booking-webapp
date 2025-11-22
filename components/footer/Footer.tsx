import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const links = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Payment Methods", href: "/payment-method" },
  ];

  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          <div>
            <Link href="/" className="mb-10 block">
              <Image
                src="/logo.png"
                alt="Footer Logo"
                width={128}
                height={49}
              />
            </Link>
            <p className="text-gray-400">
              We are committed to providing a comfortable and memorable stay for
              every guest. Experience quality hospitality with services designed
              to ensure your satisfaction.
            </p>
          </div>
          <div>
            <div className="flex gap-20">
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
                <ul className="list-none space-y-5 text-gray-400">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Subscribe to receive exclusive offers, updates, and the latest
              news from us.
            </p>

            <form action="" className="mt-5">
              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  className="w-full p-3 rounded-sm bg-white"
                  placeholder="johndoe@gmail.com"
                />
                <div className="my-4"></div>
                <button className="bg-orange-400 p-3 font-bold text-white w-full text-center rounded-sm hover:bg-orange-500">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
        &copy; Copyright 2025 | Kink Faddboyy | All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
