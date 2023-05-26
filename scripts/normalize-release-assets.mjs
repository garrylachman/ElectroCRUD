import { Octokit } from "@octokit/core";
import { createActionAuth } from "@octokit/auth-action";

const octokit = new Octokit({
  authStrategy: createActionAuth,
});

if (!process.env.TAG) {
  process.exit(1);
}

const TAG = process.env.TAG;

const release = await octokit.request('GET /repos/{owner}/{repo}/releases/tags/{tag}', {
  owner: 'garrylachman',
  repo: 'electrocrud',
  tag: TAG,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

const linuxRegex = /\.deb$|\.rpm$|\.AppImage$/mi;
const macRegex = /\.dmg$|darwin|mac/mi;
const winRegex = /\.nupkg$|\.exe$|\.msi$/mi;

const assetsForUpdate = release.data.assets
  .map((asset) => {
    let os = '';
    let label = '';
    const arch = asset.name.indexOf('arm64') > 0 ? 'arm64' : 'x64';
    const ext = asset.name.split('.').pop();
    if (linuxRegex.test(asset.name)) {
      os = "linux";
      label = `Linux (${arch})`;
    }
    if (macRegex.test(asset.name)) {
      os = "mac";
      label = `Mac/OSX (${arch})`;
    }
    if (winRegex.test(asset.name)) {
      os = "win";
      label = `Windows (${arch})`;
    }
    return {
      name: `ElectroCRUD-${TAG}-${os}-${arch}.${ext}`,
      asset_id: asset.id,
    }
  });

assetsForUpdate.forEach(async (asset) => {
  await octokit.request('PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}', {
    owner: 'garrylachman',
    repo: 'electrocrud',
    asset_id: asset.asset_id,
    name: asset.name,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
})
