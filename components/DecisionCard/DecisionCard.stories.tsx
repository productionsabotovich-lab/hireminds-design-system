import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DecisionCard } from "./DecisionCard";

const meta: Meta<typeof DecisionCard> = {
  title: "Data/DecisionCard",
  component: DecisionCard,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DecisionCard>;

export const Waiting: Story = { args: { id: "D-44", gate: "Лимит возвратов исчерпан", line: "Ждёт Антона Саботовича 23 ч 45 мин" } };
