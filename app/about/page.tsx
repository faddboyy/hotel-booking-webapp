import HeaderSection from "@/components/about/HeaderSection";
import { Metadata } from "next";
import Image from "next/image";
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are",
};

const AboutPage = () => {
  return (
    <div className="mt-16">
      <HeaderSection
        title="About Us"
        subtitle="Learn more about our story and values."
      />

      <div className="max-w-screen-xl mx-auto py-20 px-4">
        {/* ✅ perbaiki typo: gridd-cols-2 → grid-cols-1 md:grid-cols-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center">
            <Image
              src="/about-image.jpg"
              alt="About Image"
              width={650}
              height={579}
              className="rounded-lg object-cover w-full max-w-[600px] h-auto"
              priority
            />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Who We Are?
            </h1>

            <p className="text-gray-700 leading-relaxed">
              We are a hospitality-focused team committed to providing comfort,
              warmth, and memorable experiences for every guest. With dedication
              and passion, we continue to improve our services to ensure that
              your stay is always exceptional.
            </p>

            <ul className="space-y-8 pt-10">
              <li className="flex gap-5">
                <div className="flex-none mt-1 text-orange-500">
                  <IoEyeOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">Vision:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    To become a trusted and leading accommodation choice by
                    delivering exceptional comfort, outstanding service quality,
                    and a welcoming environment for every guest.
                  </p>
                </div>
              </li>

              <li className="flex gap-5">
                <div className="flex-none mt-1 text-orange-500">
                  <IoLocateOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">Mission:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    To create a safe, pleasant, and customer-centered
                    experience through continuous improvement, professional
                    service, and a commitment to ensuring every guest feels
                    valued and cared for.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
