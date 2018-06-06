import { Request, Response, Router } from "express";
import * as loadjsonfile from "load-json-file";
import * as path from "path";

const router: Router = Router();
const isDevMode = process.env.NODE_ENV === "development" || false;
const isProdMode = process.env.NODE_ENV === "production" || false;
let webpackManifest: any = {};
if (isProdMode) {
    webpackManifest = loadjsonfile.sync(path.resolve(__dirname, "..", "..", "dist", "manifest.json"));
}

const renderFullPage = () => {
    return `<!DOCTYPE html>
            <html>

            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                <title>My App</title>
                <body>
                    <script src='${isProdMode ? webpackManifest["vendors.js"] : "/vendors.bundle.js"}'></script>
                    <script src='${isProdMode ? webpackManifest["main.js"] : "/bundle.js"}'></script>
                </body>
            </html>`;
};

router.get("/", (req: Request, res: Response) => {
    res.set("Content-Type", "text/html")
        .status(200)
        .end(renderFullPage());
});

export const HomeController: Router = router;
