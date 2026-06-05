# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual
labels in this repo's tracker (Linear team `dev @ bleu` / `BLEUDEV`).

All five labels already exist on the team with exact-matching names, so the mapping is 1:1.

| Canonical role    | Label in our tracker | Linear label id                        | Meaning                                  |
| ----------------- | -------------------- | -------------------------------------- | ---------------------------------------- |
| `needs-triage`    | `needs-triage`       | `269f2797-639f-4433-83bc-b03eba45e0c3` | Maintainer needs to evaluate this issue  |
| `needs-info`      | `needs-info`         | `27cfd9f7-0df8-4a9d-bfc2-3b30487bbf8e` | Waiting on reporter for more information |
| `ready-for-agent` | `ready-for-agent`    | `935ccb4a-0543-4577-ad6d-874c9a4d8195` | Fully specified, ready for an AFK agent  |
| `ready-for-human` | `ready-for-human`    | `c6b706bc-5c6f-438d-8557-f5c4498344ba` | Requires human implementation            |
| `wontfix`         | `wontfix`            | `4fbc7352-6354-44f9-9fcb-2ce9107bd301` | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), apply the corresponding
label via `save_issue` (pass the full desired `labels` array).

Edit the right-hand columns if your vocabulary changes.
