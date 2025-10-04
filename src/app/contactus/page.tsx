import { NextPage } from 'next';
import Head from 'next/head';

const ContactUs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - VecraHost</title>
        <meta name="description" content="Contact information for VecraHost" />
      </Head>
      <main className="container mx-auto px-4 py-12 bg-gray-900 text-white min-h-screen pt-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-center text-purple-400">Contact Us</h1>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <div className="mb-6 border-b border-gray-700 pb-6">
              <p className="text-xl text-gray-300">
                This website is operated by <strong className="text-white">Kethavath Rahul</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-3 text-purple-300">Our Address</h2>
                <p className="text-gray-400 leading-relaxed">
                  60-27-3/5, 1st Floor, Kalagaranaga Babu Street, Srinivasa Nilayam,
                  <br />
                  Siddhartha Nagar, Vijayawada(Urban),
                  <br />
                  PO: Venkateswarapuram, DIST: Krishna,
                  <br />
                  Andhra Pradesh - 520010
                </p>
              </div>
              <div>
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-3 text-purple-300">Email</h2>
                  <p>
                    <a href="mailto:support@vecrahost.in" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-lg">
                      support@vecrahost.in
                    </a>
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-3 text-purple-300">Mobile</h2>
                  <p>
                    <a href="tel:+919573542943" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-lg">
                      +91 9573542943
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;