
'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, setDoc, deleteDoc, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './use-auth';

export const useBookmarks = (articleId?: number) => {
  const { user, isFirebaseConfigured } = useAuth();
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isFirebaseConfigured) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    const bookmarksColRef = collection(db, 'users', user.uid, 'bookmarks');
    const unsubscribe = onSnapshot(bookmarksColRef, (snapshot) => {
      const bookmarkedIds = snapshot.docs.map(doc => parseInt(doc.id, 10));
      setBookmarks(bookmarkedIds);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, isFirebaseConfigured]);

  const addBookmark = useCallback(async (id: number = articleId!) => {
    if (!user || !id || !isFirebaseConfigured) return;
    const bookmarkRef = doc(db, 'users', user.uid, 'bookmarks', id.toString());
    await setDoc(bookmarkRef, { savedAt: new Date() });
  }, [user, articleId, isFirebaseConfigured]);

  const removeBookmark = useCallback(async (id: number = articleId!) => {
    if (!user || !id || !isFirebaseConfigured) return;
    const bookmarkRef = doc(db, 'users', user.uid, 'bookmarks', id.toString());
    await deleteDoc(bookmarkRef);
  }, [user, articleId, isFirebaseConfigured]);

  const isBookmarked = articleId ? bookmarks.includes(articleId) : false;

  return { bookmarks, isBookmarked, addBookmark, removeBookmark, loading };
};
