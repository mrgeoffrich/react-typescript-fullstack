import { Request, Response, Router } from "express";
import { IBuildStatus } from "./../../common/models/IBuildStatus";

const router: Router = Router();

const dummyData: IBuildStatus[] = [
    {
        key: 1,
        FinishTime: new Date(2018, 1, 1, 2, 0),
        StartTime: new Date(2018, 1, 1, 1, 0),
        Status: "Success",
        TemplateId: 1,
        TemplateName: "Ubuntu VM"
    },
    {
        key: 2,
        StartTime: new Date(2018, 1, 1, 1, 0),
        Status: "Fail",
        TemplateId: 1,
        TemplateName: "Pfsense Box"
    },
    {
        key: 3,
        FinishTime: new Date(2018, 1, 1, 2, 0),
        StartTime: new Date(2018, 1, 1, 1, 0),
        Status: "In Progress",
        TemplateId: 1,
        TemplateName: "Openstack compute"
    },
    {
        key: 4,
        FinishTime: new Date(2018, 1, 1, 2, 0),
        StartTime: new Date(2018, 1, 1, 1, 0),
        Status: "Aborted",
        TemplateId: 1,
        TemplateName: "Openstrack Infra"
    }
];

router.get("/status", async (req: Request, res: Response) => {
    try {
        res.json(dummyData);
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

router.get("/status/:id", async (req: Request, res: Response) => {
    try {
        res.json(dummyData[0]);
    } catch (err) {
        res.json({ message: err.message, success: false });
    }
});

export const BuildController: Router = router;
