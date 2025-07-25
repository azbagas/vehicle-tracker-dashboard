import 'dotenv/config';
import { logger } from './application/logging';
import { web } from './application/web';

require('dotenv').config();

const PORT = 5000;

web.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
