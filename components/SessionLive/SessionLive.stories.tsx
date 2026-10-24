import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SessionLive } from "./SessionLive";

const since = Date.now() - 23 * 60000;

const meta: Meta<typeof SessionLive> = {
  title: "Feedback/SessionLive",
  component: SessionLive,
  tags: ["autodocs"],
  argTypes: { status: { control: "select", options: ["running", "starting", "answering", "retrying"] } },
  decorators: [(Story) => <div style={{ padding: 24, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SessionLive>;

const base = { role: "Developer", sessionId: "S-118", href: "#", resumed: "transcript" as const, since };

export const Running: Story = { args: { ...base, plan: { done: 3, total: 6 }, operation: "скрывает действия по роли в таблице, меню и карточке участника" } };
export const Starting: Story = { args: { ...base, status: "starting", resumed: null, since: Date.now(), operation: "читает причину возврата и отчёт QA" } };
export const NoTranscript: Story = { args: { ...base, resumed: "no-transcript", plan: { done: 1, total: 6 }, operation: "читает пакет контекста из журнала задачи" } };
export const Retrying: Story = { args: { ...base, status: "retrying", plan: { done: 3, total: 6 }, operation: "новая песочница, попытка 2 из 2: запускает тесты" } };
export const Now: Story = { args: { ...base, variant: "now", plan: { done: 3, total: 6, current: "Тесты для viewer" }, operation: "запускает тесты участников", detail: "npm test -- members" } };
