import { READING_STATUS_DEFINITIONS } from "@/lib/books/labels";
import type { Book, ReadingStatus } from "@/types/book";

export type BankStatusAggregate = {
  status: ReadingStatus;
  bookCount: number;
  registeredCount: number;
  totalPrice?: number;
};

export type LibraryBankAggregate = {
  bookCount: number;
  registeredCount: number;
  unregisteredCount: number;
  registrationRate?: number;
  totalPrice?: number;
  averagePrice?: number;
  byStatus: BankStatusAggregate[];
  books: Book[];
};

function hasRegisteredPrice(book: Book): book is Book & { price: number } {
  return book.price !== undefined;
}

function sumRegisteredPrices(books: readonly Book[]): number | undefined {
  const registeredBooks = books.filter(hasRegisteredPrice);
  if (registeredBooks.length === 0) return undefined;
  return registeredBooks.reduce((total, book) => total + book.price, 0);
}

export function aggregateLibraryBank(
  books: readonly Book[],
): LibraryBankAggregate {
  const registeredBooks = books.filter(hasRegisteredPrice);
  const totalPrice = sumRegisteredPrices(books);

  return {
    bookCount: books.length,
    registeredCount: registeredBooks.length,
    unregisteredCount: books.length - registeredBooks.length,
    registrationRate:
      books.length === 0 ? undefined : registeredBooks.length / books.length,
    totalPrice,
    averagePrice:
      totalPrice === undefined ? undefined : totalPrice / registeredBooks.length,
    byStatus: READING_STATUS_DEFINITIONS.map(({ id }) => {
      const statusBooks = books.filter((book) => book.readingStatus === id);
      const statusRegisteredBooks = statusBooks.filter(hasRegisteredPrice);
      return {
        status: id,
        bookCount: statusBooks.length,
        registeredCount: statusRegisteredBooks.length,
        totalPrice: sumRegisteredPrices(statusBooks),
      };
    }),
    books: [...books].sort((left, right) => {
      if (left.price === undefined && right.price === undefined) {
        return left.title.localeCompare(right.title, "ja");
      }
      if (left.price === undefined) return 1;
      if (right.price === undefined) return -1;
      return right.price - left.price || left.title.localeCompare(right.title, "ja");
    }),
  };
}

export function formatRegisteredPrice(price: number | undefined): string {
  if (price === undefined) return "未登録";
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatRegistrationRate(rate: number | undefined): string {
  if (rate === undefined) return "—";
  return new Intl.NumberFormat("ja-JP", {
    style: "percent",
    maximumFractionDigits: 1,
  }).format(rate);
}
