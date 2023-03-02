# whisper-chatgpt-summarize

## このリポジトリについて

- whisper と ChatGPT について API が提供されたので使ってみるリポジトリ
- whisper API で音声を文字起こしして、ChatGPT API で要約してもらうってのをやってみたかった

## 使い方

1. リポジトリをクローンする

```
$ git clone https://github.com/imo-tikuwa/whisper-chatgpt-summarize.git
$ cd whisper-chatgpt-summarize/
$ cp .env.example .env
```

2. .env の `OPENAI_API_KEY` に OpenAI で取得した API キーを設定する
3. 環境構築する

```
$ make init
```

4. コンテナの中で index.js の CLI 引数に MP3 ファイルを指定して実行

```
$ make app
$ node index.js -f [mp3ファイルの相対パス]
```

### CLI 引数について

| オプション    | 内容                       | 必須かどうか | デフォルト値                             |
| ------------- | -------------------------- | ------------ | ---------------------------------------- |
| -f, --file    | MP3 の音声ファイルのパス   | 必須         | なし                                     |
| -r, --request | ChatGPT へのリクエスト内容 | 任意         | 以下の文字列について要約をお願いします。 |

## 参考リンク
- https://openai.com/blog/introducing-chatgpt-and-whisper-apis
  - 公式ブログ