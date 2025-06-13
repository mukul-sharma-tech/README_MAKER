// import axios from 'axios';

// export default async function fetchGitHubData(githubUrl) {
//   const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
//   if (!match) throw new Error('Invalid GitHub URL');

//   const [_, owner, repo] = match;
//   const base = `https://api.github.com/repos/${owner}/${repo}`;

//   const [metaRes, contentsRes, languagesRes] = await Promise.all([
//     axios.get(base),
//     axios.get(`${base}/contents`),
//     axios.get(`${base}/languages`)
//   ]);

//   return {
//     name: metaRes.data.name,
//     description: metaRes.data.description,
//     topics: metaRes.data.topics,
//     license: metaRes.data.license?.name || 'Not specified',
//     languageStats: languagesRes.data,
//     files: contentsRes.data.map(f => ({ name: f.name, type: f.type, path: f.path }))
//   };
// }


import axios from 'axios';

const fetchGitHubData = async (githubUrl) => {
  const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) throw new Error('Invalid GitHub URL');

  const [_, owner, repo] = match;
  const base = `https://api.github.com/repos/${owner}/${repo}`;

  const [metaRes, contentsRes, langRes] = await Promise.all([
    axios.get(base),
    axios.get(`${base}/contents`),
    axios.get(`${base}/languages`)
  ]);

  return {
    name: metaRes.data.name,
    description: metaRes.data.description,
    topics: metaRes.data.topics || [],
    license: metaRes.data.license?.name || null,
    files: contentsRes.data,
    languages: langRes.data
  };
};

export default fetchGitHubData;
