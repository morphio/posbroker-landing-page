import * as migration_20250515_062431 from './20250515_062431';
import * as migration_20250625_105209 from './20250625_105209';
import * as migration_20250711_114117 from './20250711_114117';
import * as migration_20250731_111022 from './20250731_111022';

export const migrations = [
  {
    up: migration_20250515_062431.up,
    down: migration_20250515_062431.down,
    name: '20250515_062431',
  },
  {
    up: migration_20250625_105209.up,
    down: migration_20250625_105209.down,
    name: '20250625_105209',
  },
  {
    up: migration_20250711_114117.up,
    down: migration_20250711_114117.down,
    name: '20250711_114117',
  },
  {
    up: migration_20250731_111022.up,
    down: migration_20250731_111022.down,
    name: '20250731_111022'
  },
];
