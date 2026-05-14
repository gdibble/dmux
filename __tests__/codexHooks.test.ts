import { describe, expect, it } from 'vitest';
import {
  buildCodexHookedCommand,
  CODEX_ENABLE_GOALS_FLAG,
  CODEX_ENABLE_HOOKS_FLAG,
  enableCodexHooksFlag,
} from '../src/utils/codexHooks.js';

describe('codexHooks', () => {
  it('uses the supported hooks feature flag when enabling Codex hooks', () => {
    expect(enableCodexHooksFlag('codex resume --last')).toBe(
      `codex ${CODEX_ENABLE_HOOKS_FLAG} resume --last`
    );
  });

  it('prefixes exported dmux variables before enabling hooks', () => {
    expect(buildCodexHookedCommand('codex resume --last', {
      dmuxPaneId: 'dmux-1',
      tmuxPaneId: '%9',
      eventFile: '/tmp/dmux-event.json',
    })).toBe(
      "export DMUX_PANE_ID='dmux-1'; export DMUX_TMUX_PANE_ID='%9'; export DMUX_CODEX_HOOK_EVENT_FILE='/tmp/dmux-event.json'; codex --enable hooks resume --last"
    );
  });

  it('can enable the Codex goals feature alongside hooks', () => {
    expect(buildCodexHookedCommand('codex resume --last', {
      dmuxPaneId: 'dmux-1',
      tmuxPaneId: '%9',
    }, {
      enableGoals: true,
    })).toBe(
      `export DMUX_PANE_ID='dmux-1'; export DMUX_TMUX_PANE_ID='%9'; codex ${CODEX_ENABLE_HOOKS_FLAG} ${CODEX_ENABLE_GOALS_FLAG} resume --last`
    );
  });
});
