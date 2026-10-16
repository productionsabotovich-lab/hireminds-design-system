import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Caption } from "./Caption";

const meta: Meta<typeof Caption> = {
  title: "Atoms/Caption",
  component: Caption,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Caption>;

export const MonoStep: Story = {
  args: { font: "mono", children: "step 1 / 3" },
};

export const MonoMeta: Story = {
  args: { font: "mono", tone: "dim", children: "CLAUDE · 4.7" },
};

export const UiSub: Story = {
  args: { font: "ui", tone: "mute", children: "обновлено 21.05 · 09:23" },
};
