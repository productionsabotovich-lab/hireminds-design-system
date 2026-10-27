import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MessageQueue, type QueuedMessage } from "./MessageQueue";

const items: QueuedMessage[] = [
  { id: "q1", who: "QA", source: "из сессии S-121", time: "09:28", text: "Проверь мобильное меню участника." },
  { id: "q2", who: "Антон Саботович", own: true, source: "из Linear", time: "09:30", text: "Почему viewer видит меню участника?" },
];

const meta: Meta<typeof MessageQueue> = {
  title: "Forms/MessageQueue",
  component: MessageQueue,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 560, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MessageQueue>;

export const Collapsed: Story = { args: { role: "Developer", items } };
export const Open: Story = { args: { role: "Developer", items, defaultOpen: true } };
