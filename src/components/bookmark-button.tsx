
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  articleId: number;
  className?: string;
}

export function BookmarkButton({ articleId, className }: BookmarkButtonProps) {
  const { user, isFirebaseConfigured } = useAuth();
  const { toast } = useToast();
  const { isBookmarked, addBookmark, removeBookmark, loading } = useBookmarks(articleId);

  const handleBookmarkClick = () => {
    if (!isFirebaseConfigured) {
      toast({
        variant: 'destructive',
        title: 'Feature Unavailable',
        description: 'Please configure Firebase to enable bookmarks.',
      });
      return;
    }

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Please log in to save articles.',
      });
      return;
    }

    if (isBookmarked) {
      removeBookmark();
    } else {
      addBookmark();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBookmarkClick}
      disabled={loading}
      className={cn('text-muted-foreground hover:text-primary', className)}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Save bookmark'}
    >
      <Bookmark
        className={cn(
          'h-6 w-6 transition-colors',
          isBookmarked ? 'fill-primary text-primary' : ''
        )}
      />
    </Button>
  );
}
