import { createClientLogger } from "./public-api";

const logger = createClientLogger("core-logger:client");
logger.info("client logger ready");