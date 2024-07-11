'use client'

import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/front-end/Navbar';
import Cart from '@/components/front-end/Cart';

const Page = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar setShowCart={setShowCart} />
      {showCart && <Cart setShowCart={setShowCart} />}
      
      <div className="about-us-page p-5">
        <Head>
          <title>About Us - Kairos</title>
        </Head>
        
        <section className="about-section mb-8">
          <h1 className="text-3xl font-bold mb-4">Our Story</h1>
          <p className="text-lg leading-relaxed">
            Welcome to Kairos, where we specialize in offering a curated selection of spiritual and meditation goods. Our journey began with a deep-rooted passion for fostering inner peace and spiritual growth through meaningful products.
          </p>
          <p className="text-lg leading-relaxed">
            At Kairos, we believe in the power of mindfulness and the transformative impact it can have on a life. Our mission is to provide you with tools that inspire reflection, enhance meditation practices, and bring a sense of tranquility to your everyday rituals.
          </p>
          <p className="text-lg leading-relaxed">
            Every item in our collection is carefully chosen to resonate with the essence of spirituality and mindfulness. From healing crystals to sacred art, each product embodies a story waiting to be explored.
          </p>
        </section>
        
        <section className="mission-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission at Kairos is to empower individuals on their spiritual journey by offering products that promote mindfulness, self-discovery, and holistic well-being. We aim to create a space where you can discover meaningful treasures that align with your spiritual path.
          </p>
          <p className="text-lg leading-relaxed">
            By cultivating a community centered around spiritual growth and mindfulness, we aspire to contribute positively to the lives of our customers. We believe that every moment is an opportunity for transformation – a Kairos moment.
          </p>
        </section>
        
        <section className="vision-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            At Kairos, we envision a world where spirituality and mindfulness are integral parts of daily life. Through our products and community initiatives, we strive to foster a deeper connection to oneself and to the world around us.
          </p>
          <p className="text-lg leading-relaxed">
            We aspire to be more than a marketplace; we aim to be a source of inspiration and support on your journey towards inner peace and spiritual enlightenment. Together, let us embrace the Kairos moments that lead to profound personal growth.
          </p>
        </section>
        
        <section className="values-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-lg">
            <li>Authenticity: We believe in offering genuine, high-quality products that resonate with our customers.</li>
            <li>Community: We foster a supportive community where individuals can share experiences and insights.</li>
            <li>Integrity: We uphold transparency and ethical practices in everything we do.</li>
            <li>Inspiration: We aim to inspire personal growth and spiritual exploration through our offerings.</li>
            <li>Respect: We respect diverse spiritual beliefs and perspectives, embracing inclusivity.</li>
          </ul>
        </section>
        
        <section className="contact-section mb-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg leading-relaxed">
            We would love to hear from you! Whether you have a question about our products or want to share your spiritual journey, feel free to reach out to us.
          </p>
          <p className="text-lg">Email: info@kairos.com</p>
          <p className="text-lg">Phone: 1-800-KAIROS1</p>
        </section>
      </div>
    </>
  );
};

export default Page;
