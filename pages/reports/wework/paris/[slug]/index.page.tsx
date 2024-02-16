import { useRouter } from "next/router";
import WeWorkLocationPage from "../../../../../components/WeWorkLocationPage/WeWorkLocationPage";
import { CITY } from "./../../../../../lib/interfaces";
import { data } from "../index.page";

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query as {
    slug: string;
  };
  const locationData = data.find((d) => {
    if (d.address === slug) {
      return true;
    }
    return false;
  });
  if (!locationData) {
    return <span>loading</span>;
  }
  return <WeWorkLocationPage locationData={locationData} city={CITY.PARIS} />;
}
