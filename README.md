# Notes on handing work to coding agents

Personal working notes on splitting tasks between a human and a coding agent.

Published at <https://sonaarajyan03.github.io/agent-handoff-notes/>.

- **Writing a task spec an agent can actually run** — the two-readers problem, and six things to pin down before handing work over.
- **Agent capacity is a scheduling problem** — why per-seat limits strand capacity, and what to measure instead of seats.
- **Local vs remote MCP servers** — a decision table: trust boundary, install cost, credentials, debuggability.

## Turning "make it better" into one task someone can accept

"Make the daily reward popup better" is not a task. Nobody can finish it, and nobody can say no to the result. Before it goes to a teammate or a coding agent, shrink it to one outcome that a test can check.

1. **Find the complaint behind the request.** Ask whoever wrote it what they actually saw. Here, QA reported that a fast double tap on Claim sometimes granted 200 gems instead of 100.
2. **Write the outcome as something observable.** One sentence, with no "better", "cleaner" or "smoother" in it.
3. **Name the check that decides it**, plus what must not change.
4. **Name three roles**: who prepares the task, who runs it, and who accepts it.

```text
Task:         A second tap on Claim while the first grant request is still
              pending does not grant a second reward.
Check:        npm test -- test/reward-popup.test.js
              (two taps 0 ms apart, server answers after 50 ms;
               expect 1 grant and 100 gems)
Keep:         popup layout, reward amounts, the server API
Out of scope: animation, copy, what happens when the request fails
Prepared by:  the producer, using QA's repro
Executed by:  the client engineer, in their own checkout, with their own
              agent and credentials
Accepted by:  QA, who reruns the repro on a device
```

In the small fixture in `examples/double-tap-claim/`, that check fails with 2 grants before the change and passes once the button is locked before the request goes out instead of after it returns. That is all it proves. It says nothing about whether the popup now feels better, and the fix leaves Claim locked if the request fails. That is why the failure path is listed as out of scope rather than quietly ignored. A narrow task is useful because it is narrow, but someone still has to decide it was the right thing to narrow down to.

This is the step of AI task handoff for teams that I see skipped most often: the person running the work needs the full spec, while the person accepting it needs only the check and what to look at. Wagglet has a longer write-up on [splitting one task into agent instructions and a human runbook](https://wagglet.com/blog/dual-prompt-human-agent-task-design).

Plain static HTML, no build step.
