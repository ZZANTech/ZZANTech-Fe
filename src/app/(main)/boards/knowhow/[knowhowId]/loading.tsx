import LoadingSpinner from "@/components/Loading/LoadingSpinner";

function loading() {
  return (
    <div className="flex items-center h-screen md:h-auto overflow-hidden">
      <LoadingSpinner />
    </div>
  );
}

export default loading;
