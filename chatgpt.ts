import { Game } from "npm:@gathertown/gather-game-client";
import { Configuration, OpenAIApi } from "npm:openai";
// 設定情報
const API_KEY = "GatherのAPIキー";
const SPACE_ID = "スペースのID";

// 初期化
const game = new Game(SPACE_ID, () => Promise.resolve({ apiKey: API_KEY }));
game.connect();

//OpenAI初期化
const configuration = new Configuration({
  apiKey: "OpenAIのAPIキー",
});
const openai = new OpenAIApi(configuration);

// 参加
game.enter({
  name: "SAMPLE_BOT",
  isNpc: true,
});

// 接続時成功時の処理
game.subscribeToConnection((connected) => {
  console.log("接続可否: " + connected);
});
game.subscribeToEvent("playerChats", async (data) => {
  const contents = data.playerChats.contents;
  //console.log();
  if (data.playerChats.senderId == "botアカウントのID") return;
  if (data.playerChats.recipient !== "botアカウントのID") {
    return;
  }

  const text = contents.replace(/^\S+\s+/, "");
  console.log(contents);

  //OpenAI APIの設定
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: text }],
  });
  const result = chatCompletion.data.choices[0].message?.content;
  if (!result) return;
  console.log(result);

  //返信
  game.chat(
    data.playerChats.senderId,
    [],
    data.playerChats.senderId || "",
    {
      contents: result,
    },
  );
});
