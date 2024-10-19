import Head from "next/head";
import Card from "@/components/Card";
import { useRouter } from "next/router";

export async function getServerSideProps({ query: { username } }) {
  const GH_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

  if (!GH_USERNAME_REGEX.test(username)) {
    return { props: { username, repos: [], redirect: true } };
  }

  const reqUrl = `https://api.github.com/users/${username}/starred?&per_page=1000&sort=updated`;
  try {
    const response = await fetch(reqUrl);
    const allRepos = await response.json();
    const reposWithDiscussions = allRepos.filter(
      (repo) => repo.has_discussions
    );

    const result = reposWithDiscussions.map((repo) => {
      return {
        id: repo.id,
        owner: repo.owner.login,
        avatar: repo.owner.avatar_url,
        name: repo.name,
        discussion: `${repo.html_url}/discussions`
      };
    });
    return { props: { username, repos: result, redirect: false } };
  } catch (error) {
    const result = [];
    return { props: { username, repos: result, redirect: false } };
  }
}

export default function Username({ username, repos, redirect }) {
  const router = useRouter();

  if (redirect) {
    router.push("/");
  }

  let list;
  if (repos.length > 0) {
    list = repos.map((repo) => <Card key={repo.id} repo={repo} />);
  } else {
    list = (
      <p className="text-center text-gray-500">{`${username} doesn't have any discussions.`}</p>
    );
  }

  return (
    <main className="flex flex-col min-h-screen p-16">
      <Head>
        <title>@{username}&apos;s Starred Discussions ⭐</title>
      </Head>
      <h1 className="mb-10 text-2xl font-bold text-center text-gray-100">
        <a
          href={`https://github.com/${username}`}
          className="text-gray-300 underline"
          target="_blank"
        >
          @{username}
        </a>
        &apos;s Starred Discussions
      </h1>
      <section className="max-w-4xl w-full mx-auto grid gap-4 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        {list}
      </section>
    </main>
  );
}
