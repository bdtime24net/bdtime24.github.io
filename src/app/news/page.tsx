"use client";

import React from 'react';
import useBlogs from '@/hooks/useBlogs';
import Link from 'next/link';
import { Spin, message } from 'antd';

const News = () => {
  const pageSize = 10; // Number of blogs per page
  const { blogs, loading, error } = useBlogs(1, pageSize); // Fetch blogs with pagination

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  if (error) {
    message.error('Failed to fetch blogs');
    return null;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {blogs.map(blog => (
        <div key={blog.id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <Link href={`/news/${blog.id}`}>
            <p>
              {blog.urlToImage && blog.urlToImage.length > 0 && (
                <img
                  src={blog.urlToImage[0]}
                  alt={blog.headline}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">{blog.headline}</h2>
                <p className="text-gray-600">{blog.description.slice(0, 100)}...</p>
                <span className="text-sm text-blue-500 mt-2 inline-block">Read more</span>
              </div>
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default News;