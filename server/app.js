import express from "express";
import cors from "cors";
import path from "path";
import crossPortKiller from "cross-port-killer";

const client = express();

client.use(cors());
client.use(express.json());

const client_build = path.join(process.cwd(), "..", "client", "build");
const client_index = path.join(
  process.cwd(),
  "..",
  "client",
  "build",
  "index.html"
);

// console.log(client_build, client_index);
client.use(express.static(client_build));
client.get("*", (req, res) => {
  res.sendFile(client_index);
});
crossPortKiller
  .kill(3000, "tcp")
  .then(() => {
    // Start your application on the specified port
    // const app = require('./your-app-file');
    client.listen(3000, () => {
      console.log(`Server is running on port ${3000}`);
    });
  })
  .catch((err) => {
    console.error("Error killing the port:", err);
  });
export default client;
