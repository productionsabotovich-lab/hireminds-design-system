import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActivityFeed, type ActivityFeedEvent } from "./ActivityFeed";
import { CodeChip } from "../CodeChip";
import { Pill } from "../Pill";

const at = (day: number, hm: string) => {
  const [h, m] = hm.split(":").map(Number);
  return new Date(2026, 9, 24 + day, h, m);
};

const events: ActivityFeedEvent[] = [
  { id: "1", kind: "phase", time: at(-1, "04:48"), children: "Spec → Code", detail: "Объём согласован" },
  { id: "2", kind: "session", time: at(-1, "04:49"), actor: "Developer", children: <>начал работу · <CodeChip href="#">S-118</CodeChip></> },
  { id: "3", kind: "message", time: at(-1, "08:40"), actor: "QA", quote: "Проверил 9 сценариев, 8 прошли.", files: ["docs/qa/PIL-15-report.md"] },
  { id: "4", kind: "return", time: at(-1, "08:42"), actor: "QA", children: "вернул задачу в Code", detail: "Причина: viewer видит «Удалить участника»" },
  { id: "5", kind: "reminder", time: at(0, "09:00"), actor: "Hireminds", children: <>напомнил о решении <CodeChip href="#">D-44</CodeChip></>, detail: "Ждёт 23 ч 45 мин" },
];

const steps: ActivityFeedEvent[] = [
  { id: "s1", kind: "files", time: at(0, "09:24"), actor: "Developer", children: "изменил 2 файла", files: ["apps/web/src/members/MemberMenu.tsx", "apps/web/src/members/roles.test.ts"] },
  { id: "s2", kind: "check", time: at(0, "09:33"), actor: "Developer", children: "запустил тесты", pill: <Pill tone="accent">42 из 42</Pill> },
];

const meta: Meta<typeof ActivityFeed> = {
  title: "Data/ActivityFeed",
  component: ActivityFeed,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

export const Task: Story = { args: { events, now: at(0, "09:37") } };
export const Messages: Story = { args: { events, now: at(0, "09:37"), view: "messages" } };
export const Empty: Story = { args: { events: [], emptyText: "Задачу назначили на Аналитика. Начало фазы Spec появится здесь в течение минуты." } };
export const Loading: Story = { args: { events: [], loading: true } };
export const Session: Story = { args: { variant: "session", events: steps, updatedAt: at(0, "09:36") } };
