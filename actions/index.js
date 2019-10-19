import fetch from 'isomorphic-fetch';

async function fetchUserFollowers(user) {
  const res = await fetch(`https://api.github.com/users/${user}/followers`, {
    headers: {
      Authorization: 'token 430d02dc2632417c45701b4b3b1e64e0232c1a31'
    }
  });
  const followers = await res.json();
  console.log(followers);
  if (!followers) return [];
  const followerUsernames = followers.map(f => f.login);
  return followerUsernames;
}

async function fetchUser(username) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: 'token 430d02dc2632417c45701b4b3b1e64e0232c1a31'
    }
  });
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