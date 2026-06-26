import { mockBooks } from '@/data/mock-books';
import { mockNotes } from '@/data/mock-notes';
import { mockTopics } from '@/data/mock-topics';
import type { Book, Note, Topic } from '@/types/content';

export async function getTopics(): Promise<Topic[]> {
  return mockTopics;
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  return mockTopics.find((topic) => topic.slug === slug) ?? null;
}

export async function getTopicWithRelatedContent(slug: string): Promise<{
  topic: Topic;
  books: Book[];
  notes: Note[];
} | null> {
  const topic = mockTopics.find((item) => item.slug === slug);

  if (!topic) {
    return null;
  }

  return {
    topic,
    books: mockBooks.filter((book) => book.topics?.some((item) => item.slug === slug)),
    notes: mockNotes.filter((note) => note.topics?.some((item) => item.slug === slug)),
  };
}
