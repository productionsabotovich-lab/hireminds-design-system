import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Conversation, type ConversationItem } from "./Conversation";

const messages: ConversationItem[] = [
  { id: "s1", system: true, actor: "Маркетинг", text: "Маркетинг открыл решение", link: "ред. 1", time: "10:12" },
  { id: "m1", who: "Антон Саботович", human: true, time: "10:40", text: "Бюджет на вебинар завышен. @PM, посмотри." },
  { id: "m2", who: "PM", time: "10:58", text: "Без вебинара охват падает на треть.", replyTo: "m1" },
];

const meta: Meta<typeof Conversation> = {
  title: "Forms/Conversation",
  component: Conversation,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Conversation>;

export const Talk: Story = {
  args: {
    author: "Маркетинг",
    messages,
    mentions: [
      { name: "PM", kind: "role" },
      { name: "Антон Саботович", kind: "person" },
    ],
    directory: { "Антон Саботович": { human: true, dative: "Антону Саботовичу" } },
  },
};
export const Empty: Story = { args: { author: "Reviewer", messages: [] } };
