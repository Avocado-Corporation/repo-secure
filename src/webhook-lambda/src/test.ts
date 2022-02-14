/* eslint-disable quotes */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

exports.handler = async (event) => {
  const PK = Buffer.from(process.env.PK || "", "base64").toString();
  console.log(PK);
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: 171967,
      privateKey: PK,
      installationId: 23218238,
    },
  });

  const { data } = await appOctokit.request("/app");

  const { token } = await appOctokit.auth({
    type: "installation",
    installationId: 23218238,
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
