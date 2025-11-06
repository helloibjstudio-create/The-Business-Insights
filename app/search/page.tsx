import { Suspense } from "react";
import SearchContent from "../components/SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center text-white py-40">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
