import React from 'react';
import {FaFacebookF,FaInstagram,FaTwitter} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-3">
            <h6>About Us</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Company Info</a></li>
              <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-light text-decoration-none">Press</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="col-md-3">
            <h6>Help & Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Shipping</a></li>
              <li><a href="#" className="text-light text-decoration-none">Returns</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="col-md-3">
            <h6>Legal</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Media or Logo Section */}
          <div className="col-md-3">
            <h6>Follow Us On:</h6>
            <ul className="list-unstyled d-flex gap-3">
            <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
            </ul>
          </div>
        </div>

        <hr className="bg-light" />
        <p className="text-center small mb-0">© {new Date().getFullYear()} MyShop.com</p>
      </div>
    </footer>
  );
};

export default Footer;
