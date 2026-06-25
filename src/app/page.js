import Banner from "@/components/home/Banner";
import Marquee from "@/components/home/Marquee";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import { fetchBooks } from "@/lib/api";

export default async function Home() {
  // Fetch all books from the server, then feature the top 4.
  const books = await fetchBooks();
  const featured = books.slice(0, 4);
  const newArrivalTitles = books.slice(0, 3).map((b) => b.title);

  return (
    <main className="flex flex-1 flex-col">
      <Banner />
      <Marquee items={newArrivalTitles} />
      <FeaturedBooks books={featured} />
    </main>
  );
}
