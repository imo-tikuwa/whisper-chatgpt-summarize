const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const program = require("commander");

// CLI引数をパース
program.option("-f, --file <path>", "Path to MP3 file");
program.option("-r, --request <text>", "ChatGPTへのリクエスト内容", "以下の文字列について要約をお願いします。");
program.parse(process.argv);

const options = program.opts();
if (!options.file) {
  console.error("Missing required argument: -f/--file");
  process.exit(1);
} else if (!options.file.toLowerCase().endsWith(".mp3")) {
  console.error("Invalid file");
  process.exit(1);
}

(async () => {
  // whisper APIのリクエスト実行
  const form = new FormData();
  form.append("model", "whisper-1");
  form.append("file", fs.createReadStream(options.file));
  try {
    const transcriptionResult = await axios
      .post("https://api.openai.com/v1/audio/transcriptions", form, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          ...form.getHeaders(),
        },
      })
      .then((response) => response.data.text);

    // ChatGPT APIのリクエスト実行
    const summarizeResult = await axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `${options.request}「${transcriptionResult}」`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response.data.choices[0].message.content;
      });

    // 結果出力
    console.log("---------- whisper result ----------");
    console.log(transcriptionResult.trim());
    console.log("\n");
    console.log("---------- chatgpt result ----------");
    console.log(summarizeResult.trim());
  } catch (error) {
    console.log(error.response.data);
    process.exit(1);
  }
})();
