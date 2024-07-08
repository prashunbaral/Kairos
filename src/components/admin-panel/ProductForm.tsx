"use client"

import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { makeToast } from '@/utils/helper';
import { useAppDispatch } from '@/redux/hooks';
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';
import { setLoading } from '@/redux/features/loadingSlice';

interface IPayload {
  imgSrc: null | string;
  fileKey: null | string;
  name: string;
  category: string;
  price: string;
  navCategory: string;
  subNavCategory: string;
}

const ProductForm = () => {
  const [payload, setPayload] = useState<IPayload>({
    imgSrc: null,
    fileKey: null,
    name: '',
    category: '',
    price: '',
    navCategory: '',
    subNavCategory: '',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories] = useState<string[]>(['Yoga', 'Meditation', 'Devotion and Deities', 'Vedic Scriptures']);
  
  const subcategories: { [key: string]: string[] } = {
    'Yoga': ["Asana Essentials", "Pranayama Provisions", "Surya Spirit", "Mudra Mastery", "Vinyasa Vitality", "Namaste Necessities", "Sanskrit Serentity", "Gyan Yoga Gear", "Kundalini Collection", "Bhakti Bliss", "Yoga Sutra Selects", "Moksha Moments"],
    'Meditation': ["Dhyanam Delights", "Tranquility Tools", "Chakra Harmony", "Mantra Magic", "Shanti Sanctuary", "Yogic Bliss", "Mindfulness Must-Haves", "Zen Zone"],
    'Devotion and Deities': ["Lord Ganesh Grace", "Lord Shiva Reverence", "Lord Vishnu's Vaikuntha Veneration", "Goddess Durga Shakti Sadhana", "Lord Bhairav Bhakti", "Goddess Bhairavi Blessings", "Goddess Kali", "Goddess Dhanalaxmi Light", "Goddess Saraswati Virtue", "Lord Hanuman Harmony", "Lord Vithlal Prayers", "Lord Ayappa Abode", "Lord Murugan Might", "Surya Dev Serene", "Shani Dev Serenity", "Mangal Dev Mangalya", "Rahu Rahasya", "Ketu Kalyan"],
    'Vedic Scriptures': ["Bhakti Bibliotheca", "Vedic Wisdom", "Puranix Tales", "Upanishadic Insights", "Bhagvad Gita Treasury", "Ramayana Recollections", "Mahabharata Masterpieces", "Shashtra Shelf", "Tantric Treatises", "Devotional Discourses", "Mantra Compendiums", "Sanskrit Scriptures", "Pilgrimage Pages", "Saints and Sages", "Astrological Almanacs", "Ayurvedic Almanacs", "Ayurvedic Aids", "Goddess Grimoire", "Karma Chroniclas", "Bhajan Booklets", "Vedanta Vault"],
  };

  const dispatch = useAppDispatch();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCat = e.target.value;
    setSelectedCategory(selectedCat);
    setPayload({ ...payload, navCategory: selectedCat, subNavCategory: '' }); // Reset subcategory when category changes
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    console.log(payload);

    axios
      .post('/api/add_product', payload)
      .then((res) => {
        makeToast('Product Added Successfully');
        setPayload({
          imgSrc: null,
          fileKey: null,
          name: '',
          category: '',
          price: '',
          navCategory: '',
          subNavCategory: '',
        });
      })
      .catch((err) => console.error('Error adding product:', err))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc ? payload.imgSrc : '/placeholder.png'}
        width={800}
        height={500}
        alt="product"
      />

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log(res);
          setPayload({
            ...payload,
            imgSrc: res[0]?.url,
            fileKey: res[0]?.key,
          });
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error}`);
        }}
      />

      <div>
        <label className="block ml-1">Product Name</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.name}
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block ml-1">Product Description</label>
        <textarea
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.category}
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block ml-1">Product Price</label>
        <input
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          type="text"
          value={payload.price}
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block ml-1">Product Category</label>
        <select
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.navCategory}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block ml-1">Product SubCategory</label>
        <select
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.subNavCategory}
          onChange={(e) => setPayload({ ...payload, subNavCategory: e.target.value })}
          required
        >
          <option value="">Select SubCategory</option>
          {subcategories[selectedCategory]?.map((subcat, index) => (
            <option key={index} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end">
        <button className="bg-pink-600 text-white px-8 py-2 rounded-md">Add</button>
      </div>
    </form>
  );
};

export default ProductForm;
