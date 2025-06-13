import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const GITHUB_API = 'https://api.github.com';

export async function fetchRepoFilesRecursive(owner, repo, path = '') {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  });

  if (!res.ok) throw new Error(`GitHub API failed: ${res.statusText}`);
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
