'use client';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

const DeleteArticle: React.FC<{ articleId: string }> = ({ articleId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // Check if authToken exists in localStorage
    const authToken = localStorage.getItem('authToken');
    
    if (!authToken) {
      message.error('You are not authenticated!');
      return; // Stop the delete operation if no token is found
    }

    // Proceed with the delete operation
    setLoading(true);
    
    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/article/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to delete article');
      }

      message.success('Article deleted successfully');
      router.push('/dashboard/news'); // Navigate to the news dashboard
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Failed to delete article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-24'>
      <h2>Are you sure you want to delete this article?</h2>
      <Button danger onClick={handleDelete} loading={loading}>
        Delete Article
      </Button>
    </div>
  );
};

export default DeleteArticle;
