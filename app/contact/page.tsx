import HeaderSection from "@/components/about/HeaderSection";
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";
import {
  IoCallOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";

export const metadata: Metadata = {
  title: "Contact",
};
const ContactPage = () => {
  return (
    <div>
      <HeaderSection
        title="Contact Us"
        subtitle="We’re here to assist you anytime"
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-lg text-gray-500 mb-3">Contact Us</h1>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Get In Touch Today
            </h1>
            <p className="text-gray-700 py-5">
              Feel free to reach out to us for any questions, booking
              assistance, or general inquiries. Our team is always ready to help
              you with prompt and friendly support.
            </p>
            <ul className="list-item space-y-6 pt-8">
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                  <IoMailOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Email: </h4>
                  <p>email-us@example.com</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                  <IoCallOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Phone Numnber:</h4>
                  <p>+62-812-3456-7890</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none bg-gray-300 p-3 shadow-sm rounded-sm">
                  <IoLocationOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Address:</h4>
                  <p>Jalan jawax 2025, West Java, INDONESIA</p>
                </div>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
