// Navbar.tsx

import React, { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import DropdownMenu from './DropDownMenu'; // Adjust the import path based on your project structure
import { useAppSelector } from '@/redux/hooks';

interface PropsType {
  setShowCart: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setShowCart }: PropsType, searchParams: { query?: string } = {}) => {
  const query = searchParams?.query || '';
  const cartCount = useAppSelector((state) => state.cartReducer.length);
  const { data: session, status } = useSession();
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // State to track active menu

  const handleSignIn = () => {
    signIn("google"); 
  };

  return (
    <div className='pt-4 bg-white top-0 sticky'>
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="text-4xl font-bold">Kairos</div>
          <div className='text-black flex justify-center ml-16'>
            <Link href="#" className='font-bold hover:text-blue-500 mt-1'>Home</Link>
            <Link href="#" className='font-bold hover:text-blue-500 mt-1 ml-5'>About Us</Link>
            <DropdownMenu
              triggerText="Yoga"
              menuItems={["Asana Essentials", "Pranayama Provisions", "Surya Spirit","Mudra Mastery","Vinyasa Vitality","Namaste Necessities", "Sanskrit Serentity", "Gyan Yoga Gear", "Kundalini Collection", "Bhakti Bliss", "Yoga Sutra Selects", "Moksha Moments"]}
              setActive={setActiveMenu}
              activeItem={activeMenu}
            />
            <DropdownMenu
              triggerText="Meditation"
              menuItems={["Dhyanam Delights","Tranquility Tools", "Chakra Harmony", "Mantra Magic", "Shanti Sanctuary", "Yogic Bliss", "Mindfulness Must-Haves", "Zen Zone"]}
              setActive={setActiveMenu}
              activeItem={activeMenu}
            />
            <DropdownMenu
              triggerText="Devotion and Deities"
              menuItems={["Lord Ganesh Grace","Lord Shiva Reverence", "Lord Vishnu's Vaikuntha Veneration", "Goddess Durga Shakti Sadhana", "Lord Bhairav Bhakti", "Goddess Bhairavi Blessings", "Goddess Kali", "Goddess Dhanalaxmi Light", "Goddess Saraswati Virtue", "Lord Hanuman Harmony", "Lord Vithlal Prayers", "Lord Ayappa Abode", "Lord Murugan Might", "Surya Dev Serene", "Shani Dev Serenity", "Mangal Dev Mangalya", "Rahu Rahasya", "Ketu Kalyan"]}
              setActive={setActiveMenu}
              activeItem={activeMenu}
            />

            <DropdownMenu
              triggerText="Vedic Scriptures"
              menuItems={["Bhakti Bibliotheca", "Vedic Wisdom", "Puranix Tales", "Upanishadic Insights", "Bhagvad Gita Treasury", "Ramayana Recollections", "Mahabharata Masterpieces", "Shashtra Shelf", "Tantric Treatises", "Devotional Discourses", "Mantra Compendiums", "Sanskrit Scriptures", "Pilgrimage Pages", "Saints and Sages", "Astrological Almanacs", "Ayurvedic Almanacs", "Ayurvedic Aids", "Goddess Grimoire", "Karma Chroniclas", "Bhajan Booklets", "Vedanta Vault"]}
              setActive={setActiveMenu}
              activeItem={activeMenu}
            />

            <DropdownMenu
              triggerText="Vedic Festive Supplies"
              menuItems={["Diwali Delights: Festival of Lights Celebrations", "Holi Happiness: Festival of Colors Essentials", "Navratri Necessities: Nine Nights of Worship", "Durga Puja Pandal: Celebrating the Goddess", "Janmashtami Joy: Lord Krishna's Birthday Celebrations", "Ganesh Chaturthi Gear: Welcoming the Elephant God", "Ram Navami Revelry: Lord Rama's Birth Celebrations", "Makar Sankranti Must-Haves: Harvest Festival Essentials", "Pongal Preparations: Tamil Harvest Festival Supplies", "Onam Offerings: Kerala Harvest Festival Traditions", "Baisakhi Bazaar: Sikh New Year Celebrations", "Guru Purnima Goods: Honoring Spiritual Gurus", "Maha Shivaratri Supplies: Night of Lord Shiva Worship", "Vasant Panchami Picks: Saraswati Puja Essentials", "Karva Chauth Collections: Spousal Bonding Rituals", "Gudi Padwa Gear: Maharashtrian New Year Celebrations", "Chhath Puja Preparations: Sun God Worship Traditions", "Bonalu Basics: Telangana's Goddess Mahakali Festival"]}
              setActive={setActiveMenu}
              activeItem={activeMenu}
            />
            {/* <div className='flex space-x-5 ml-40'>
              <FaFacebook href='#' className='cursor-pointer size-8 hover:text-blue-500' />
              <FaInstagram href='#' className='cursor-pointer size-8 hover:text-blue-500' />
              <FaYoutube href='#' className='cursor-pointer size-8 hover:text-blue-500' />
              <FaTiktok href='#' className='cursor-pointer size-8 hover:text-blue-500' />
            </div> */}
          </div>
          <div className='flex gap-4 md:gap-8 items-center'>
            <div className='md:flex hidden gap-3'>
              {status === 'loading' && (
                <p className='text-gray-500'>Loading...</p>
              )}
              {status === 'authenticated' && (
                <>
                  <div className='rounded-full border-2 border-gray-300 text-gray-500 text-[32px] w-[50px] h-[50px] grid place-items-center'>
                    <MdOutlineAccountCircle />
                  </div>
                  <div>
                    <p className='text-gray-500 mt-3 uppercase'>{session.user?.name}</p>
                  </div>
                </>
              )}
              {status === 'unauthenticated' && (
                <button className='text-gray-500 mt-3 hover:text-black' onClick={handleSignIn}>
                  Sign in
                </button>
              )}
            </div>
            <div className='text-gray-500 text-[32px] relative cursor-pointer' onClick={() => setShowCart(true)} >
              <FaShoppingCart />
              <div className='absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center'>
                {cartCount}
              </div>
            </div>
          </div>
        </div>
        <div className='border-b border-gray-200 pt-4'></div>
      </div>
    </div>
  );
};

export default Navbar;
