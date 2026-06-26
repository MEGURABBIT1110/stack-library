import { mockCollections } from '@/data/mock-collections';
import type { Collection } from '@/types/content';

export async function getCollections(): Promise<Collection[]> {
  return mockCollections;
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  return mockCollections.find((collection) => collection.slug === slug) ?? null;
}
