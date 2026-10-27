import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SessionLive } from "./SessionLive";

const meta: Meta<typeof SessionLive> = {
  title: "Data/SessionLive",
  component: SessionLive,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 560, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof SessionLive>;

export const Widget: Story = {
  args: { role: "Developer", sessionId: "S-118", href: "#", resumed: "transcript", elapsed: "25 мин", plan: { done: 3, total: 6 }, operation: "запускает проверки проекта" },
};
export const Retrying: Story = { args: { ...Widget.args, status: "retrying", resumed: "no-transcript" } };
export const Now: Story = { args: { variant: "now", operation: "запускает тесты участников", detail: "npm test -- members", elapsed: "2 мин" } };
