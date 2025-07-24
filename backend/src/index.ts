import { logger } from './application/logging';
import { web } from './application/web';

const PORT = 8080;

web.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
