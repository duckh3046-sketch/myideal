export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({error:"POST only"});
  if (!process.env.OPENAI_API_KEY) return res.status(500).json({error:"서버에 OPENAI_API_KEY가 등록되지 않았습니다."});

  const x = req.body || {};
  const prompt = `Create a photorealistic portrait of a fictional adult Korean person, age 25-35.
This must be a newly invented person, not a real public figure.
Face shape: ${x["얼굴형"] || ""}
Animal-face aesthetic: ${x["동물상"] || ""}
Eyes: ${x["눈"] || ""}
Nose: ${x["코"] || ""}
Lips: ${x["입"] || ""}
Hair: ${x["헤어"] || ""}
Natural skin texture, subtle expression, realistic photography, soft indoor light,
head and upper torso, looking toward camera, tasteful everyday clothing, vertical portrait.
No text, no watermark.`;

  try {
    const r = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json"},
      body: JSON.stringify({model:"gpt-image-2", prompt, size:"1024x1536", quality:"medium", output_format:"png"})
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({error:data?.error?.message || "OpenAI image request failed"});
    const image = data?.data?.[0]?.b64_json;
    if (!image) return res.status(500).json({error:"이미지 데이터가 반환되지 않았습니다."});
    return res.status(200).json({image});
  } catch (e) {
    return res.status(500).json({error:e.message});
  }
}