MyIdeal Web AI MVP

구성
- public/index.html : 휴대폰용 이상형 설정 UI
- api/generate.js   : 서버에서 OpenAI 이미지 API 호출
- vercel.json       : Vercel 배포 설정

중요
OPENAI_API_KEY를 HTML/JavaScript에 직접 넣지 마세요.
배포 서비스의 Environment Variables에 OPENAI_API_KEY로 등록하세요.

배포 후:
얼굴형/동물상/눈/코/입/헤어 선택 -> AI 이상형 생성 -> 실사형 가상 인물 이미지 표시

다음 개발:
1. 생성된 얼굴의 기준 이미지를 캐릭터 ID와 함께 저장
2. 동일 얼굴 유지 편집
3. 대화 AI
4. 음성
5. 얼굴/립싱크 애니메이션
