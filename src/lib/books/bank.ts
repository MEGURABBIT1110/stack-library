import type { Book } from "@/types/book";

export type LibraryBankAggregate = {
  bookCount: number;
  registeredCount: number;
  unregisteredCount: number;
  totalPrice?: number;
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
    totalPrice,
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
  })
    .format(price)
    .replace("￥", "¥");
}
