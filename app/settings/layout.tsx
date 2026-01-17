import AllNotesHeader from "@/components/AllNotesHeader";
import BottomNav from "@/components/BottomNav";
import SettingsNav from "@/components/SettingsNav";
import SideBar from "@/components/SideBar";
import SearchProvider from "@/contexts/SearchContext";
import TagFilterProvider from "@/contexts/TagFilterContext";

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen overflow-hidden static">
      <div className="flex h-full">
        <TagFilterProvider>
          <SideBar />
          <SearchProvider>
            <div className="flex flex-col flex-1 h-full overflow-hidden">
              <AllNotesHeader />
              <div className="flex flex-1 min-h-0">{children}</div>
              <SettingsNav />
            </div>
          </SearchProvider>
        </TagFilterProvider>
      </div>
      <BottomNav />
    </div>
  );
}
