import FeaturedSection from "@/components/home/FeaturedSection";
import SectionGrid from "@/components/home/SectionGrid";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";

const HomePage = () => {
  const {
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
    madeForYouSongs,
    trendingSongs,
    featuredSongs,
    isLoading,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      trendingSongs.length > 0 &&
      featuredSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, featuredSongs, trendingSongs, madeForYouSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeaturedSection />
        </div>

        <div className="space-y-8">
          <SectionGrid
            title="Made For You"
            songs={madeForYouSongs}
            isLoading={isLoading}
          />
          <SectionGrid
            title="Trending"
            songs={trendingSongs}
            isLoading={isLoading}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
