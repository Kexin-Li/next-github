import fetch from 'isomorphic-fetch';

async function fetchUserFollowers(user) {
  const res = await fetch(`https://api.github.com/users/${user}/followers`);
  const followers = await res.json();
  if (!followers) return [];
  const followerUsernames = followers.map(f => f.login);
  return followerUsernames;
}

async function fetchUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const userInfo = await res.json();
  return userInfo;
}

export async function getUserFollowersInfo(user) {
  const followers = await fetchUserFollowers(user);

  let results = [];
  await Promise.all(
    followers.map(async username => {
      const userInfo = await fetchUser(username);
      results.push(userInfo);
    })
  );
  return results;
}
