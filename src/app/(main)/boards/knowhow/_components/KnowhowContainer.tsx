import KnowhowFilter from "./KnowhowFilter";
import KnowhowList from "./KnowhowList";
import KnowhowPagination from "./KnowhowPagination";

function KnowhowContainer() {
  // 여기서 fetching 후 filtering 후 list로 보내주기
  return (
    <section>
      <KnowhowFilter />
      <KnowhowList />
      <KnowhowPagination />
    </section>
  );
}

export default KnowhowContainer;
