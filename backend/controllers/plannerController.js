import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import OpenAI from "openai";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import Subject from "../models/Subject.js";
import Topic from "../models/Topic.js";
import StudyPlan from "../models/StudyPlan.js";

// ---------------------------
// PDF TEXT EXTRACTION
// ---------------------------
const extractTextFromPDF = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    text += strings.join(" ") + "\n";
  }

  return text;
};

// ---------------------------
// 🔥 FORGETTING CURVE LOGIC
// ---------------------------
const generatePlan = (topics, months) => {
  const weeks = months * 4;
  const plan = [];

  let topicIndex = 0;

  for (let i = 1; i <= weeks; i++) {
    let contentParts = [];

    // new topic
    if (topics[topicIndex]) {
      contentParts.push(topics[topicIndex]);
    }

    // spaced repetition
    if (i > 1 && topics[topicIndex - 1]) {
      contentParts.push(`Revise ${topics[topicIndex - 1]}`);
    }

    if (i > 3 && topics[topicIndex - 2]) {
      contentParts.push(`Revise ${topics[topicIndex - 2]}`);
    }

    if (i > 6 && topics[topicIndex - 3]) {
      contentParts.push(`Revise ${topics[topicIndex - 3]}`);
    }

    if (contentParts.length === 0) {
      contentParts.push("Revision");
    }

    plan.push({
      week: i,
      content: contentParts.join(" + "),
    });

    if (i % 2 === 0 && topicIndex < topics.length - 1) {
      topicIndex++;
    }
  }

  return plan;
};

// ---------------------------
// CONTROLLER
// ---------------------------
export const generateStudyPlan = async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const { subjectName, duration } = req.body;

    let syllabusText = "";

    // FILE READ
    if (req.files?.syllabus) {
      const filePath = req.files.syllabus[0].path;
      syllabusText = await extractTextFromPDF(filePath);
      fs.unlinkSync(filePath);
    }

    if (!syllabusText.trim()) {
      return res.status(400).json({
        message: "No valid text extracted",
      });
    }

    // ---------------------------
    // AI → ONLY TOPICS
    // ---------------------------
    const response = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON with subject and topics.",
        },
        {
          role: "user",
          content: `
Extract clean topics.

Return JSON:
{
  "subject": "string",
  "topics": ["topic1", "topic2"]
}

Syllabus:
${syllabusText}
          `,
        },
      ],
    });

    let text = response.choices[0].message.content;
    text = text.replace(/```json|```/g, "").trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ message: "Invalid AI response" });
    }

    const aiData = JSON.parse(jsonMatch[0]);

    // 🔥 OUR LOGIC
    const finalPlan = generatePlan(
      aiData.topics,
      Number(duration || 6)
    );

    // ---------------------------
    // DATABASE
    // ---------------------------

    let subject = await Subject.findOne({
      name: subjectName,
      userId: req.user.id,
    });

    if (!subject) {
      subject = await Subject.create({
        name: subjectName || aiData.subject,
        userId: req.user.id,
      });
    }

    await Topic.deleteMany({
      subjectId: subject._id,
      userId: req.user.id,
    });

    const topics = await Topic.insertMany(
      aiData.topics.map((t) => ({
        name: t,
        subjectId: subject._id,
        userId: req.user.id,
      }))
    );

    await StudyPlan.deleteMany({
      subjectId: subject._id,
      userId: req.user.id,
    });

    const studyPlan = await StudyPlan.create({
      subjectId: subject._id,
      userId: req.user.id,
      date: new Date(),
      plan: finalPlan, // ✅ FIXED
    });

    res.status(200).json({
      message: "Study plan generated successfully",
      subject,
      topics,
      studyPlan,
    });

  } catch (error) {
    console.error("Planner Error:", error);

    res.status(500).json({
      message: error.message || "Failed to generate study plan",
    });
  }
};