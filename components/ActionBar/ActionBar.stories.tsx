import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ActionBar } from "./ActionBar";

const meta: Meta<typeof ActionBar> = {
  title: "Forms/ActionBar",
  component: ActionBar,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 960, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const Block: Story = {
  args: {
    variant: "block",
    question: "Утвердить план кампании?",
    summary: "D-46 · PIL-31 · бюджет 95 000 ₽",
    actions: [
      { label: "Утвердить", variant: "primary" },
      { label: "Вернуть на доработку", variant: "secondary" },
    ],
  },
};
export const Bar: Story = { args: { ...Block.args, variant: "bar" } };
