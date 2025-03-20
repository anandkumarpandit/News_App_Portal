import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-gray-400 text-sm">
          Welcome to [Your App Name], your trusted digital news source,
           dedicated to bringing you fast, reliable, and well-researched
          news from around the world. In an era of information overload,
           we aim to cut through the noise and provide you with clear, concise,
            and accurate reporting.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>

          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to={"/"} className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to={"/about"} className="hover:text-white">
                About Us
              </Link>
            </li>

            <li>
              <Link to={"/news"} className="hover:text-white">
                News Articles
              </Link>
            </li>

            <li>
              <Link to={"/"} className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>

          <p className="text-gray-400 text-sm">
          Birganj Bus Park-44300, Nepal
          </p>

          <p className="text-gray-400 text-sm">Email: anandpandit405@gmail.com</p>

          <p className="text-gray-400 text-sm">Phone: +977-9825342161</p>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        <p>Follow us on:</p>

        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="hover:text-white">
            Facebook
          </a>

          <a href="#" className="hover:text-white">
            Twitter
          </a>

          <a href="#" className="hover:text-white">
            LinkedIn
          </a>

          <a href="#" className="hover:text-white">
            Instagram
          </a>
        </div>

        <p className="mt-4">
          &copy; {new Date().getFullYear()} Digital News. All rights
          reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
