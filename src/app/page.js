import Banner from "@/components/home/Banner";
import Marquee from "@/components/home/Marquee";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import { fetchBooks } from "@/lib/api";

export default async function Home() {
  // Fetch all books from the server, then derive featured + category counts.
  const books = await fetchBooks();
  const featured = books.slice(0, 4);
  const newArrivalTitles = books.slice(0, 3).map((b) => b.title);

  const counts = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <main className="flex flex-1 flex-col">
      <Banner />
      <Marquee items={newArrivalTitles} />
      <FeaturedBooks books={featured} />
      <CategoryShowcase counts={counts} />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}
