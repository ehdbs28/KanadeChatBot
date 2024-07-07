# 카나데 챗봇
OpenAi의 Assistant api를 사용하여, [요이사키 카나데](https://namu.wiki/w/요이사키%20카나데)의 정보를 학습시킨 챗봇을 제작 후 디스코드 대화 봇으로 만든 프로젝트

## Commands

- `.env`의 등록된 채널에서 채팅을 치면 카나데가 응답해줍니다.
  
## Usage

`.env` 파일 속 정보를 설정합니다. (숨겨진 파일 보기를 체크해야 보입니다.)

> BOT_TOKEN -> 디스코드 봇의 토큰을 입력합니다.
> CHAT_CHANNEL_ID -> 챗봇이 활동할 디스코드 채널의 ID를 입력합니다.
> OPENAI_API_KEY -> Open Ai에서 발급받은 api key를 입력합니다.
> OPENAI_ASSISTANT_ID -> Assistant에서 제작한 챗봇의 ID를 입력합니다.

`npm run dev` | `npm run start`를 통해 봇을 실행하실 수 있습니다.
