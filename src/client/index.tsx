import * as React from "react";
import { render } from "react-dom";
import "semantic-ui-css/semantic.css";
import { Socket } from "socket.io-client";
import { AppRouter } from "./routes";

const root = document.createElement("div");
document.body.appendChild(root);

render(<AppRouter />, root);
