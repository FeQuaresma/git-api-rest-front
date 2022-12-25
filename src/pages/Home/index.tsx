import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { userURL } from "../../constants";

function Home() {
  const [users, setUsers] = useState([{ login: "", id: 0 }]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const init_component = useCallback(() => {
    fetch(`${userURL}?since=${page}&per_page=10`)
      .then((result) => result.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((_err) => setError(true));
  }, [setUsers, page]);

  useEffect(() => {
    init_component();
  }, [init_component]);

  if (users[0].login === "" && error === false) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>We're having a connection problem with the GitHub API</div>;
  }
  return (
    <div className="flex flex-col justify-center py-5 px-10 items-center gap-5">
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="github-icon"
        className="h-48 w-48 rounded-full"
      />
      <h1 className="font-bold text-3xl">GitHub API Rest Users:</h1>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Search a User:</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex gap-5"
        >
          <input
            type="text"
            className="p-2 rounded-lg bg-slate-300 text-slate-900"
            value={username}
            placeholder="Input the Github account"
            onChange={(e) => {
              setUsername(e.target.value.trim());
            }}
          />
          <Link to={`/user?username=${username}`} type="submit" className="bg-teal-900 p-2 rounded-lg">
            Search
          </Link>
        </form>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-2xl">Users List</h2>
        {users.map((user) => (
          <p key={user.login}>
            <Link
              to={`/user?username=${user.login}`}
              className="p-2 rounded-lg hover:bg-slate-300 hover:text-slate-900"
            >
              {user.id} - {user.login}
            </Link>
          </p>
        ))}
        <div className="flex gap-5">
          <button
            disabled={page <= 0}
            onClick={() => setPage(page - 10)}
            className="bg-teal-900 p-2 rounded-lg disabled:bg-gray-500"
          >
            Last Page
          </button>
          <button
            onClick={() => setPage(page + 10)}
            className="bg-teal-900 p-2 rounded-lg disabled:bg-gray-500"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
