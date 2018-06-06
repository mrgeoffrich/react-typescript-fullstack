import { Request, Response, Router } from "express";
import { IStatus } from "../../common/models/IStatus";

const router: Router = Router();

const dummyData: IStatus = {
    AllHealthy: true,
    ESXiConnected: true,
    StoreHealthy: true,
    VCenterConnected: true
};

router.get("/", async (req: Request, res: Response) => {
    try {
        res.json(dummyData);
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

export const StatusController: Router = router;
