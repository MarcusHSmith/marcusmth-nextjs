import { buildLlmsFullTxt } from "../lib/llms";

export async function getServerSideProps({ res }) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.write(buildLlmsFullTxt());
  res.end();

  return {
    props: {},
  };
}

export default function LlmsFullTxtPage() {
  return null;
}
