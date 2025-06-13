// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [githubUrl, setGithubUrl] = useState("");
//   const [readmeData, setReadmeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setReadmeData(null);

//     try {
//       // Step 1: Fetch repo files and metadata
//       const { data: repoInfo } = await axios.post("http://localhost:5000/api/fetch-files", {
//         githubUrl,
//       });

//       // Step 2: Generate README
//       const { data } = await axios.post("http://localhost:5000/api/generate-readme", {
//         githubUrl,
//         repoInfo,
//       });

//       if (data.markdownSections) {
//         setReadmeData(data.markdownSections);
//       } else {
//         setError("❌ Failed to generate README");
//       }
//     } catch (err) {
//       console.error("❌ Axios error:", err);
//       setError(
//         err.response?.data?.error || "❌ Something went wrong while generating README"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl space-y-4"
//       >
//         <h1 className="text-2xl font-bold text-center">📘 Generate README</h1>

//         <input
//           type="text"
//           placeholder="Enter GitHub Repo URL"
//           value={githubUrl}
//           onChange={(e) => setGithubUrl(e.target.value)}
//           className="w-full border px-4 py-2 rounded-lg"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
//         >
//           {loading ? "Generating..." : "Generate README"}
//         </button>

//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </form>

//       {readmeData && (
//         <div className="mt-8 bg-white p-6 rounded-xl shadow-md w-full max-w-4xl whitespace-pre-wrap">
//           <h2 className="text-xl font-semibold mb-2">📝 Generated README</h2>
//           <pre>{generateMarkdown(readmeData)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// function generateMarkdown(data) {
//   return `# ${data.title}

// ${data.description}

// ## 🚀 Features
// ${data.features.map((f) => `- ${f}`).join("\n")}

// ## 🛠️ Tech Stack
// ${data.techStack.map((t) => `- ${t}`).join("\n")}

// ## 📦 Installation
// ${data.installation}

// ## 📄 License
// ${data.license}
// `;
// }

// export default App;



// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// function App() {
//   const [githubUrl, setGithubUrl] = useState("");
//   const [readmeData, setReadmeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setReadmeData(null);

//     try {
//       const { data: repoInfo } = await axios.post("http://localhost:5000/api/fetch-files", {
//         githubUrl,
//       });

//       const { data } = await axios.post("http://localhost:5000/api/generate-readme", {
//         githubUrl,
//         repoInfo,
//       });

//       if (data.markdownSections) {
//         setReadmeData(data.markdownSections);
//       } else {
//         setError("❌ Failed to generate README");
//       }
//     } catch (err) {
//       console.error("❌ Axios error:", err);
//       setError(err.response?.data?.error || "❌ Something went wrong while generating README");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-blue-200 flex flex-col items-center p-6">
//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-5"
//       >
//         <h1 className="text-3xl font-bold text-center text-indigo-600">📘 Auto README Generator</h1>

//         <input
//           type="text"
//           placeholder="Enter GitHub Repository URL"
//           value={githubUrl}
//           onChange={(e) => setGithubUrl(e.target.value)}
//           className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           required
//         />

//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           whileHover={{ scale: 1.03 }}
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg w-full shadow-md transition duration-300"
//         >
//           {loading ? "⏳ Generating..." : "🚀 Generate README"}
//         </motion.button>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//       </motion.form>

//       {readmeData && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mt-10 bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl whitespace-pre-wrap font-mono text-gray-800 text-sm"
//         >
//           <h2 className="text-xl font-semibold text-indigo-700 mb-4">📝 Generated README.md</h2>
//           <pre className="overflow-auto max-h-[70vh]">{generateMarkdown(readmeData)}</pre>
//         </motion.div>
//       )}
//     </div>
//   );
// }

// function generateMarkdown(data) {
//   return `# ${data.title}

// ${data.description}

// ## 🚀 Features
// ${data.features.map((f) => `- ${f}`).join("\n")}

// ## 🛠️ Tech Stack
// ${data.techStack.map((t) => `- ${t}`).join("\n")}

// ## 📦 Installation
// ${data.installation}

// ## 📄 License
// ${data.license}
// `;
// }

// export default App;



// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// function App() {
//   const [githubUrl, setGithubUrl] = useState("");
//   const [readmeData, setReadmeData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setReadmeData(null);

//     try {
//       const { data: repoInfo } = await axios.post("http://localhost:5000/api/fetch-files", {
//         githubUrl,
//       });

//       const { data } = await axios.post("http://localhost:5000/api/generate-readme", {
//         githubUrl,
//         repoInfo,
//       });

//       if (data.markdownSections) {
//         setReadmeData(data.markdownSections);
//       } else {
//         setError("❌ Failed to generate README");
//       }
//     } catch (err) {
//       console.error("❌ Axios error:", err);
//       setError(err.response?.data?.error || "❌ Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       {/* Left Panel */}
//       <div className="md:w-1/3 w-full bg-gradient-to-tr from-indigo-100 to-blue-200 p-6 flex justify-center items-start">
//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4"
//         >
//           <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
//             📘 Auto README Generator
//           </h1>

//           <input
//             type="text"
//             placeholder="Enter GitHub Repository URL"
//             value={githubUrl}
//             onChange={(e) => setGithubUrl(e.target.value)}
//             className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             whileHover={{ scale: 1.03 }}
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg w-full shadow-md transition duration-300"
//           >
//             🚀 {loading ? "Generating..." : "Generate README"}
//           </motion.button>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         </motion.form>
//       </div>

//       {/* Right Panel */}
//       <div className="md:w-2/3 w-full bg-gray-900 text-white p-8 overflow-auto">
//         {readmeData ? (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto"
//           >
//             <h2 className="text-xl font-semibold text-indigo-400 mb-4">📝 Generated README.md</h2>
//             <pre className="whitespace-pre-wrap">{generateMarkdown(readmeData)}</pre>
//           </motion.div>
//         ) : (
//           <p className="text-center text-gray-400 mt-10">No README generated yet</p>
//         )}
//       </div>
//     </div>
//   );
// }

// function generateMarkdown(data) {
//   return `# ${data.title}

// ${data.description}

// ## 🚀 Features
// ${data.features.map((f) => `- ${f}`).join("\n")}

// ## 🛠️ Tech Stack
// ${data.techStack.map((t) => `- ${t}`).join("\n")}

// ## 📦 Installation
// ${data.installation}

// ## 📄 License
// ${data.license}
// `;
// }

// export default App;




import React, { useState } from "react";

function App() {
  const [githubUrl, setGithubUrl] = useState("");
  const [readmeData, setReadmeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReadmeData(null);

    try {
      // Fetch repository files
      const repoResponse = await fetch("http://localhost:5000/api/fetch-files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ githubUrl }),
      });

      if (!repoResponse.ok) {
        throw new Error(`HTTP error! status: ${repoResponse.status}`);
      }

      const repoInfo = await repoResponse.json();

      // Generate README
      const readmeResponse = await fetch("http://localhost:5000/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ githubUrl, repoInfo }),
      });

      if (!readmeResponse.ok) {
        throw new Error(`HTTP error! status: ${readmeResponse.status}`);
      }

      const data = await readmeResponse.json();

      if (data.markdownSections) {
        setReadmeData(data.markdownSections);
      } else {
        setError("❌ Failed to generate README");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(err.message || "❌ Something went wrong while generating README");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
            📘 Auto README Generator
            <span className="text-sm font-normal text-gray-300">Transform your repository into professional documentation</span>
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-12 shadow-2xl animate-in fade-in-0 slide-in-from-top-4 duration-500"
        >
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-purple-200 mb-3">
                GitHub Repository URL
              </label>
              <input
                type="text"
                placeholder="https://github.com/username/repository"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-white/10 backdrop-blur border border-white/30 text-white placeholder-gray-400 px-6 py-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg transition-all duration-300"
                required
              />
            </div>
            <div className="xl:w-auto xl:flex xl:items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 w-full xl:w-auto transform hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                {loading ? "⏳ Generating..." : "🚀 Generate README"}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mt-6 bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl backdrop-blur animate-in fade-in-0 slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}
        </form>

        {/* Generated README Display */}
        {readmeData && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-600">
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-8 py-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  📝 Generated README.md
                </h2>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur hover:scale-105 active:scale-95">
                  📋 Copy to Clipboard
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <div className="bg-gray-900/50 backdrop-blur rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">README.md</span>
                </div>
                <pre className="text-green-400 font-mono text-sm leading-relaxed p-6 overflow-auto max-h-[70vh] whitespace-pre-wrap">
                  {generateMarkdown(readmeData)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-500/30 border-t-purple-500 mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-white text-xl font-medium">Analyzing repository and generating README...</p>
            <p className="text-purple-300 text-sm mt-2">This may take a few moments</p>
          </div>
        )}
      </div>
    </div>
  );
}

function generateMarkdown(data) {
  return `# ${data.title}

${data.description}

## 🚀 Features
${data.features.map((f) => `- ${f}`).join("\n")}

## 🛠️ Tech Stack
${data.techStack.map((t) => `- ${t}`).join("\n")}

## 📦 Installation
${data.installation}

## 📄 License
${data.license}
`;
}

export default App;