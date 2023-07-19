"use server";

import axios from "axios";
//@ts-ignore
import pdfParse from "pdf-parse/lib/pdf-parse";

export async function extractTextFromPdf(file: Blob) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const pdfData = await pdfParse(buffer);

  return pdfData.text;
}

async function processTextWithGpt(text: string, apiKey: string) {
  const gptUrl = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const payload = {
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7,
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `It is example JSON file
        {
          "english_level": "",
          "city": "",
          "age": "",
          "studies": "",
          "github": "",
          "website": "",
          "technologies_skills": [
            "COBOL",
            "C# (.NET)",
            "ASP.NET",
            "Entity Framework Core",
            "Python",
            "React",
            "Angular",
            "Vue.js",
            "HTML"
          ],
          "languages": [
            "Polish",
            "English"
          ],
          "experience": [
            {
              "name": "Magical Code Crafting Agency",
              "duration": "3 years",
              "position": "Enchanted Programmer",
              "responsibilities": [
                "Developed enchanting web applications using Python and JavaScript.",
                "Collaborated with a team to create user-friendly interfaces."
              ]
            }
          ]
        }
        , generate the same JSON with the data provided here (if you do not find related data fill empty fields with null and do not use values from example JSON): ${text}`,
      },
    ],
  };

  const response = await axios.post(gptUrl, payload, {
    headers,
  });

  const responseTEXT = response.data.choices[0].message.content;
  const responseJson = JSON.parse(responseTEXT);
  return responseJson;
}

export const parse = async (file: Blob) => {
  const pdfText = await extractTextFromPdf(file);

  const gptResponse = await processTextWithGpt(
    pdfText,
    "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"
  );

  return gptResponse;
};
