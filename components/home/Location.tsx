// components/home/Locations.tsx

export default function Location() {
  return (
    <div className="my-20 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-5 uppercase">
        Our Locations
      </h2>
      <p className="text-center mb-10 text-gray-600">
       Discover the location of our hotel through the interactive map below.
      </p>

      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.1057535243747!2d106.81154477412993!3d-6.629587365152215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d9e57ad5ed%3A0x3d83175f39c47b9!2sHotel%20Example!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
        ></iframe>
      </div>
    </div>
  );
}
