import * as bunyan from "bunyan";
import * as http from "http";

class DependencyManager {
    public Initialise = async (server: http.Server,
                               logger: bunyan,
                               logFilePath: string,
                               firstRun: boolean) => {
    // TODO: Manage dependencies in here
    // such as databases and other services.
    }
}

const dependencyManager: DependencyManager =  new DependencyManager();

// Only ever have one dependency manager
export function Dependencies() {
    return dependencyManager;
}
