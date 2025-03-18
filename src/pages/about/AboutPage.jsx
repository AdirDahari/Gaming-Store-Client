import { Fragment } from "react";
import { nanoid } from "nanoid";
import { itemData, itemDataMobile } from "./imagesList";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const AboutPage = () => {
  return (
    <Fragment>
      <div className="relative bg-gray-800 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
          <img
            src={itemData[0].img}
            alt="Gaming background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Gaming Store
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            We're passionate about gaming and committed to creating the best
            platform for buying, selling, and trading games.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">
                Welcome to Gaming Store
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Gaming Store, we're passionate about gaming. We understand
                the thrill of discovering a hidden gem or finding the perfect
                addition to your gaming collection. That's why we've created a
                space where gamers like you can buy, sell, and trade pre-owned
                games.
              </p>

              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Our Story
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded by a avid gamer, Gaming Store was born out of a shared
                love for gaming and a desire to create a community-driven
                platform. Thus, we set out on a mission to build a platform
                where gamers can connect, trade, and explore the world of gaming
                together.
              </p>

              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Community Engagement
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We believe that gaming is more than just a hobby—it's a
                community. That's why we're committed to fostering a vibrant and
                inclusive gaming community. Join us and trade your games to
                discover and help gamers enjoy a wide selection at a fair price.
              </p>

              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our mission is simple: to provide gamers with a reliable and
                convenient platform to buy, sell, and trade games.
              </p>

              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Get in Touch
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To see the project go to my Github or contact us via email or
                LinkedIn in the links down below.
              </p>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2">
            <div className="grid grid-cols-4 gap-2 auto-rows-[200px]">
              {itemData.map((item) => {
                const spanClass = `${
                  item.rows ? `row-span-${item.rows}` : "row-span-1"
                } ${item.cols ? `col-span-${item.cols}` : "col-span-1"}`;

                return (
                  <div
                    key={nanoid()}
                    className={`${spanClass} overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg`}
                  >
                    <img
                      {...srcset(item.img, 240, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="block md:hidden w-full">
            <div className="grid grid-cols-4 gap-2 auto-rows-[150px]">
              {itemDataMobile.map((item) => {
                const spanClass = `${
                  item.rows ? `row-span-${item.rows}` : "row-span-1"
                } ${item.cols ? `col-span-${item.cols}` : "col-span-1"}`;

                return (
                  <div
                    key={nanoid()}
                    className={`${spanClass} overflow-hidden rounded-lg shadow-md`}
                  >
                    <img
                      {...srcset(item.img, 150, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Community First
              </h3>
              <p className="text-gray-600">
                We build features and make decisions with our gaming community
                in mind.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                Every game traded on our platform is verified and guaranteed to
                work as described.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Trust & Security
              </h3>
              <p className="text-gray-600">
                We prioritize creating a safe environment for all transactions
                and interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutPage;
