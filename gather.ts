import ky from "https://cdn.skypack.dev/ky@0.28.1?dts";
// const SPACE_ID = "適当なやつ"
// const API_KEY = "入力する"
// Deno.env.get("変数名")
await ky.post(
  "https://api.gather.town/api/v2/spaces",
  {
    sourceSpace: SPACE_ID,
    name: "my new space",
  },
  {
    headers: {
      apiKey: API_KEY,
    },
  },
);
