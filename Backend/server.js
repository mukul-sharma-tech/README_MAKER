// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import axios from 'axios';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// import fetchGitHubData from './utils/fetchGitHubData.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Helper to clean Gemini's markdown response
// function extractJSON(text) {
//   try {
//     const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
//     if (jsonMatch) {
//       return JSON.parse(jsonMatch[1]);
//     } else {
//       return JSON.parse(text);
//     }
//   } catch (err) {
//     console.error("❌ JSON Parsing Error:", err);
//     return null;
//   }
// }

// app.post('/api/generate-readme', async (req, res) => {
//   const { githubUrl } = req.body;

//   if (!githubUrl) {
//     return res.status(400).json({ error: 'GitHub URL is required' });
//   }

//   try {
//     const repoInfo = await fetchGitHubData(githubUrl);

//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const prompt = `
// You are an AI that generates README file content.

// Based on the following GitHub repository metadata:

// {
//   "name": "${repoInfo.name}",
//   "description": "${repoInfo.description}",
//   "topics": ${JSON.stringify(repoInfo.topics)},
//   "license": "${repoInfo.license || 'N/A'}",
//   "languages": ${JSON.stringify(repoInfo.languages)},
//   "files": ${JSON.stringify(repoInfo.files.map(f => f.name))}
// }

// Generate the following sections for a README:
// - title
// - description
// - features (array)
// - techStack (array)
// - installation (text)
// - license (text)

// Respond ONLY in valid JSON format. Do NOT include markdown or triple backticks.
// `;

//     const result = await model.generateContent(prompt);
//     const responseText = await result.response.text();
//     const markdownSections = extractJSON(responseText);

//     if (!markdownSections) {
//       return res.status(500).json({ error: 'Failed to parse Gemini response' });
//     }

//     res.json({ markdownSections });

//   } catch (error) {
//     console.error('❌ Error generating README:', error);
//     res.status(500).json({ error: 'Failed to generate README' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const GITHUB_API = 'https://api.github.com';

// // Recursive function to fetch all files in a repo
// async function fetchRepoFilesRecursive(owner, repo, path = '') {
//   const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `token ${process.env.GITHUB_TOKEN}`,
//       Accept: 'application/vnd.github.v3+json',
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`GitHub API Error: ${res.statusText}`);
//   }

//   const data = await res.json();

//   let allFiles = [];

//   for (const item of data) {
//     if (item.type === 'file') {
//       allFiles.push({
//         name: item.name,
//         path: item.path,
//         download_url: item.download_url,
//       });
//     } else if (item.type === 'dir') {
//       const subFiles = await fetchRepoFilesRecursive(owner, repo, item.path);
//       allFiles = allFiles.concat(subFiles);
//     }
//   }

//   return allFiles;
// }

// // API endpoint to fetch files from GitHub
// app.post('/api/fetch-files', async (req, res) => {
//   try {
//     const { githubUrl } = req.body;

//     if (!githubUrl || !githubUrl.includes('github.com')) {
//       return res.status(400).json({ error: 'Invalid GitHub URL' });
//     }

//     const [owner, repo] = githubUrl.split('github.com/')[1].split('/');
//     const files = await fetchRepoFilesRecursive(owner, repo);

//     res.json({ files });
//   } catch (error) {
//     console.error('Error fetching GitHub files:', error.message);
//     res.status(500).json({ error: 'Failed to fetch files from GitHub' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });





// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const GITHUB_API = 'https://api.github.com';
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // 🔁 Recursive GitHub repo file fetch
// async function fetchRepoFilesRecursive(owner, repo, path = '') {
//   const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
//   const res = await fetch(url, {
//     headers: {
//       Authorization: `token ${process.env.GITHUB_TOKEN}`,
//       Accept: 'application/vnd.github.v3+json',
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`GitHub API Error: ${res.statusText}`);
//   }

//   const data = await res.json();
//   let allFiles = [];

//   for (const item of data) {
//     if (item.type === 'file') {
//       allFiles.push({
//         name: item.name,
//         path: item.path,
//         download_url: item.download_url,
//       });
//     } else if (item.type === 'dir') {
//       const subFiles = await fetchRepoFilesRecursive(owner, repo, item.path);
//       allFiles = allFiles.concat(subFiles);
//     }
//   }

//   return allFiles;
// }

// // 🧠 Helper to parse Gemini JSON response
// function extractJSON(text) {
//   try {
//     const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
//     if (jsonMatch) return JSON.parse(jsonMatch[1]);
//     return JSON.parse(text);
//   } catch (err) {
//     console.error('❌ JSON Parsing Error:', err);
//     return null;
//   }
// }

// // 📁 Fetch files from GitHub
// app.post('/api/fetch-files', async (req, res) => {
//   try {
//     const { githubUrl } = req.body;
//     if (!githubUrl || !githubUrl.includes('github.com')) {
//       return res.status(400).json({ error: 'Invalid GitHub URL' });
//     }

//     const [owner, repo] = githubUrl.split('github.com/')[1].split('/');
//     const files = await fetchRepoFilesRecursive(owner, repo);
//     res.json({ files });
//   } catch (error) {
//     console.error('❌ Error fetching GitHub files:', error.message);
//     res.status(500).json({ error: 'Failed to fetch files from GitHub' });
//   }
// });

// // 📄 Generate README from repo metadata and files
// app.post('/api/generate-readme', async (req, res) => {
//   const { githubUrl, repoInfo } = req.body;

//   if (!githubUrl || !repoInfo) {
//     return res.status(400).json({ error: 'GitHub URL and repoInfo are required' });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const prompt = `
// You are an AI that generates README file content.

// Based on the following GitHub repository metadata:

// {
//   "name": "${repoInfo.name}",
//   "description": "${repoInfo.description}",
//   "topics": ${JSON.stringify(repoInfo.topics)},
//   "license": "${repoInfo.license || 'N/A'}",
//   "languages": ${JSON.stringify(repoInfo.languages)},
//   "files": ${JSON.stringify(repoInfo.files.map(f => f.name))}
// }

// Generate the following sections for a README:
// - title
// - description
// - features (array)
// - techStack (array)
// - installation (text)
// - license (text)

// Respond ONLY in valid JSON format. Do NOT include markdown or triple backticks.
// `;

//     const result = await model.generateContent(prompt);
//     const responseText = await result.response.text();
//     const markdownSections = extractJSON(responseText);

//     if (!markdownSections) {
//       return res.status(500).json({ error: 'Failed to parse Gemini response' });
//     }

//     res.json({ markdownSections });
//   } catch (error) {
//     console.error('❌ Error generating README:', error.message);
//     res.status(500).json({ error: 'Failed to generate README' });
//   }
// });

// // 🚀 Server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });





// //working fine
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import fetch from 'node-fetch';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const GITHUB_API = 'https://api.github.com';
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Recursive function to fetch all files
// async function fetchRepoFilesRecursive(owner, repo, path = '') {
//   const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;

//   const res = await fetch(url, {
//     headers: {
//       Authorization: `token ${process.env.GITHUB_TOKEN}`,
//       Accept: 'application/vnd.github.v3+json',
//     },
//   });

//   if (!res.ok) throw new Error(`GitHub API Error: ${res.statusText}`);

//   const data = await res.json();
//   let allFiles = [];

//   for (const item of data) {
//     if (item.type === 'file') {
//       allFiles.push({
//         name: item.name,
//         path: item.path,
//         download_url: item.download_url,
//       });
//     } else if (item.type === 'dir') {
//       const subFiles = await fetchRepoFilesRecursive(owner, repo, item.path);
//       allFiles = allFiles.concat(subFiles);
//     }
//   }

//   return allFiles;
// }

// // Fetch repo metadata
// async function fetchRepoInfo(githubUrl) {
//   const [owner, repo] = githubUrl.split('github.com/')[1].split('/');

//   const [repoDataRes, languagesRes, topicsRes, files] = await Promise.all([
//     fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
//       headers: {
//         Authorization: `token ${process.env.GITHUB_TOKEN}`,
//       },
//     }),
//     fetch(`${GITHUB_API}/repos/${owner}/${repo}/languages`, {
//       headers: {
//         Authorization: `token ${process.env.GITHUB_TOKEN}`,
//       },
//     }),
//     fetch(`${GITHUB_API}/repos/${owner}/${repo}/topics`, {
//       headers: {
//         Authorization: `token ${process.env.GITHUB_TOKEN}`,
//         Accept: 'application/vnd.github.mercy-preview+json',
//       },
//     }),
//     fetchRepoFilesRecursive(owner, repo),
//   ]);

//   const repoData = await repoDataRes.json();
//   const languages = await languagesRes.json();
//   const topicsData = await topicsRes.json();

//   return {
//     name: repoData.name,
//     description: repoData.description,
//     license: repoData.license?.name || 'N/A',
//     languages: Object.keys(languages),
//     topics: topicsData.names || [],
//     files,
//   };
// }

// // Helper to clean Gemini's markdown response
// function extractJSON(text) {
//   try {
//     const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
//     if (jsonMatch) {
//       return JSON.parse(jsonMatch[1]);
//     } else {
//       return JSON.parse(text);
//     }
//   } catch (err) {
//     console.error('❌ JSON Parsing Error:', err);
//     return null;
//   }
// }

// // Endpoint to generate README
// app.post('/api/generate-readme', async (req, res) => {
//   const { githubUrl } = req.body;

//   if (!githubUrl) {
//     return res.status(400).json({ error: 'GitHub URL is required' });
//   }

//   try {
//     const repoInfo = await fetchRepoInfo(githubUrl);

//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const prompt = `
// You are an AI that generates README file content.

// Based on the following GitHub repository metadata:

// {
//   "name": "${repoInfo.name}",
//   "description": "${repoInfo.description}",
//   "topics": ${JSON.stringify(repoInfo.topics)},
//   "license": "${repoInfo.license}",
//   "languages": ${JSON.stringify(repoInfo.languages)},
//   "files": ${JSON.stringify(repoInfo.files.map(f => f.name))}
// }

// Generate the following sections for a README:
// - title
// - description
// - features (array)
// - techStack (array)
// - installation (text)
// - license (text)

// Respond ONLY in valid JSON format. Do NOT include markdown or triple backticks.
// `;

//     const result = await model.generateContent(prompt);
//     const responseText = await result.response.text();
//     const markdownSections = extractJSON(responseText);

//     if (!markdownSections) {
//       return res.status(500).json({ error: 'Failed to parse Gemini response' });
//     }

//     res.json({ markdownSections });

//   } catch (error) {
//     console.error('❌ Error generating README:', error.message);
//     res.status(500).json({ error: 'Failed to generate README' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });




import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---- GitHub Utilities ----

const GITHUB_API = 'https://api.github.com';

async function fetchRepoFilesRecursive(owner, repo, path = '') {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) throw new Error(`GitHub API Error: ${res.statusText}`);

  const data = await res.json();
  let allFiles = [];

  for (const item of data) {
    if (item.type === 'file') {
      allFiles.push({
        name: item.name,
        path: item.path,
        download_url: item.download_url,
      });
    } else if (item.type === 'dir') {
      const subFiles = await fetchRepoFilesRecursive(owner, repo, item.path);
      allFiles = allFiles.concat(subFiles);
    }
  }

  return allFiles;
}

async function fetchFileContents(files) {
  const contents = {};

  for (const file of files) {
    try {
      const res = await fetch(file.download_url);
      if (res.ok) {
        const text = await res.text();
        contents[file.name] = text.slice(0, 1500); // limit content to avoid Gemini limits
      }
    } catch (e) {
      console.error(`❌ Failed to fetch ${file.name}:`, e.message);
    }
  }

  return contents;
}

// ---- Gemini Helper ----

function extractJSON(text) {
  try {
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
    return jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(text);
  } catch (err) {
    console.error("❌ JSON Parsing Error:", err);
    return null;
  }
}

// ---- Routes ----

// Step 1: Fetch files + metadata
app.post('/api/fetch-files', async (req, res) => {
  try {
    const { githubUrl } = req.body;

    if (!githubUrl || !githubUrl.includes('github.com')) {
      return res.status(400).json({ error: 'Invalid GitHub URL' });
    }

    const [owner, repo] = githubUrl.split('github.com/')[1].split('/');
    const files = await fetchRepoFilesRecursive(owner, repo);

    const fileContents = await fetchFileContents(files);

    const repoInfoRes = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const repoInfo = await repoInfoRes.json();

    res.json({
      name: repoInfo.name,
      description: repoInfo.description,
      topics: repoInfo.topics,
      license: repoInfo.license?.name || 'N/A',
      languages: await repoInfo.languages_url
        ? await (await fetch(repoInfo.languages_url, {
            headers: {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
          })).json()
        : {},
      files,
      fileContents,
    });
  } catch (error) {
    console.error('❌ Error fetching repo data:', error.message);
    res.status(500).json({ error: 'Failed to fetch repo data' });
  }
});

// Step 2: Generate README using Gemini
app.post('/api/generate-readme', async (req, res) => {
  const { githubUrl, repoInfo } = req.body;

  if (!githubUrl || !repoInfo) {
    return res.status(400).json({ error: 'GitHub URL and repoInfo are required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are an AI that generates professional README.md content.

Use the following repository info:

{
  "name": "${repoInfo.name}",
  "description": "${repoInfo.description}",
  "topics": ${JSON.stringify(repoInfo.topics)},
  "license": "${repoInfo.license}",
  "languages": ${JSON.stringify(repoInfo.languages)},
  "files": ${JSON.stringify(repoInfo.files.map(f => f.name))},
  "fileContents": ${JSON.stringify(repoInfo.fileContents)}
}

Generate this JSON (no markdown or comments):

{
  "title": "...",
  "description": "...",
  "features": ["...", "..."],
  "techStack": ["...", "..."],
  "installation": "...",
  "license": "..."
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const markdownSections = extractJSON(text);

    if (!markdownSections) {
      return res.status(500).json({ error: 'Failed to parse Gemini response' });
    }

    res.json({ markdownSections });
  } catch (error) {
    console.error('❌ Gemini Error:', error.message);
    res.status(500).json({ error: 'Failed to generate README' });
  }
});

// ---- Start Server ----

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
