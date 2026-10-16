import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dot } from "./Dot";

const meta: Meta<typeof Dot> = {
  title: "Atoms/Dot",
  component: Dot,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, display: "flex", gap: 16, alignItems: "center" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const Separator: Story = {
  args: { variant: "separator", tone: "dim", size: "xs" },
};

export const StatusAccent: Story = {
  args: { variant: "status", tone: "accent", size: "md" },
};

export const Presence: Story = {
  args: { variant: "presence", tone: "accent", size: "sm" },
};

export const Kicker: Story = {
  args: { variant: "kicker", tone: "accent", size: "md" },
};
