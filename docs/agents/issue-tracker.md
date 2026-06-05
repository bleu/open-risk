# Issue tracker: Linear (via MCP)

Issues and PRDs for this repo live in **Linear**, workspace `bleu-builders`.
Use the Linear MCP tools (`mcp__claude_ai_Linear__*`) for all operations — there is no local CLI.

## Target

- **Team**: `dev @ bleu` — key `BLEUDEV`, id `607c4ade-1058-4b14-b862-07f00d3d218f`
- **Project**: `open-risk` — id `fffdf735-06be-415a-8985-99f3812ee4f9`
  (URL: https://linear.app/bleu-builders/project/open-risk-fe4071cdc017)

Always create issues in this team **and** associate them with this project.

## Conventions

- **Create an issue**: `save_issue` with `team: "607c4ade-1058-4b14-b862-07f00d3d218f"`,
  `project: "fffdf735-06be-415a-8985-99f3812ee4f9"`, a `title`, and a markdown `description`.
  Pass markdown with literal newlines — do not escape them.
- **Read an issue**: `get_issue` by id/identifier. Use `list_comments` for the discussion thread.
- **List issues**: `list_issues` filtered by `team`, `project`, `label`, and/or `state`.
- **Comment**: `save_comment` with the issue id and markdown `body`.
- **Apply / remove labels**: `save_issue` with the issue `id` and the full desired `labels` array
  (label names or ids). Look up label ids with `list_issue_labels` for the team.
- **Close / change state**: `save_issue` with the issue `id` and the target `state`
  (e.g. "Done", "Canceled"). Use `list_issue_statuses` for the team to see valid states.

## When a skill says "publish to the issue tracker"

Create a Linear issue in team `BLEUDEV`, project `open-risk`.

## When a skill says "fetch the relevant ticket"

Call `get_issue` (plus `list_comments`) for the referenced issue identifier (e.g. `BLEUDEV-123`).
