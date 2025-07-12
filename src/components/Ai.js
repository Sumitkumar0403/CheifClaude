import React from "react";
import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Don't expose this on the frontend
  dangerouslyAllowBrowser: true, // ONLY use this for testing in non-production!
});

export async function getRecipeFromGPT(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;



  const body = {
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
      },
    ],
    max_tokens: 1024,
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      console.error("No choices in response:", data);
      return "Sorry, no recipe could be generated.";
    }
  } catch (error) {
    console.error("GPT error:", error);
    return "Sorry, something went wrong.";
  }
}




