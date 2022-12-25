import { useCallback, useEffect, useState } from "react";
import { userURL } from "../../constants";
import useQuery from "../../hooks/useQuery";
import moment from "moment";
import { Link } from "react-router-dom";

function User() {
  const [user, setUser] = useState({
    id: 0,
    login: "",
    html_url: "",
    created_at: "",
  });
  const [userRepo, setUserRepo] = useState([
    {
      id: 0,
      name: "",
      html_url: "",
    },
  ]);
  const [error, setError] = useState(false);
  const query = useQuery();
  const init_component = useCallback(() => {
    fetch(`${userURL}/${query.get("username")}/details`) //http://localhost:3000/api/users/fequaresma/details
      .then((result) => result.json())
      .then((data) => {
        setUser(data);
      })
      .catch((_err) => setError(true));
    fetch(`${userURL}/${query.get("username")}/repos`)
      .then((result) => result.json())
      .then((data) => {
        setUserRepo(data);
      })
      .catch((_err) => setError(true));
  }, []);

  useEffect(() => {
    init_component();
  }, [init_component]);

  if (user.login === "" && error === false) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>We have a connection problem with the GitHub API</div>;
  }
  return (
    <div className="flex flex-col justify-center py-5 px-10 items-center gap-5">
      <Link to={`/`} className="font-bold text-3xl">GitHub API Rest Users:</Link>
      <h2 className="font-bold text-2xl">User</h2>
      <div id="user">
        <p>Id: {user.id}</p>
        <p>Username: {user.login}</p>
        <a href={user.html_url}>Profile URL: {user.html_url}</a>
        <p>
          Date of login creation:{" "}
          {moment(user.created_at).format("MMMM Do YYYY")}
        </p>
      </div>
      <div id="user-repo">
        <table className="bg-slate-900">
          <thead className="bg-slate-300">
            <tr>
              <td className="text-slate-900">Id</td>
              <td className="text-slate-900">Repository Name</td>
              <td className="text-slate-900">URL</td>
            </tr>
          </thead>
          <tbody>
            {userRepo.map((repos) => (
              <tr key={repos.id}>
                <td>{repos.id}</td>
                <td>{repos.name}</td>
                <td>
                  <a href={repos.html_url}>{repos.html_url}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
