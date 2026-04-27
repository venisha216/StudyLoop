import OpenAI from "openai";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const analyzeDocument = async (req, res) => {
  try {
    let { text, messages } = req.body;

    // 🔥 FIX: parse messages if coming from FormData
    if (typeof messages === "string") {
      try {
        messages = JSON.parse(messages);
      } catch {
        messages = [];
      }
    }

    // 📄 FILE HANDLING
    if (req.file) {
      const file = req.file;

      // PDF
      if (file.mimetype === "application/pdf") {
        const pdf = await pdfjsLib.getDocument({
          data: new Uint8Array(file.buffer),
        }).promise;

        let extracted = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          extracted += content.items.map((item) => item.str).join(" ");
        }

        text = extracted;
      }

      // DOCX
      else if (
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({
          buffer: file.buffer,
        });
        text = result.value;
      }

      else {
        return res.status(400).json({
          message: "Only PDF and DOCX supported",
        });
      }
    }

    // ❌ no input
    if (!text && (!messages || messages.length === 0)) {
      return res.status(400).json({
        message: "Provide text or file",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const chatMessages = [
      {
        role: "system",
        content:
          "You are a helpful AI study assistant. You explain clearly and generate summaries and quizzes.",
      },
      ...(messages || []),
    ];

    if (text) {
      chatMessages.push({
        role: "user",
        content: text.slice(0, 6000),
      });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: chatMessages,
    });

    res.json({
      result: response.choices[0].message.content,
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      message: "Error processing request",
    });
  }
};