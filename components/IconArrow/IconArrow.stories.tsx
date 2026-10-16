import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconArrow } from "./IconArrow";

const meta: Meta<typeof IconArrow> = {
  title: "Atoms/IconArrow",
  component: IconArrow,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, display: "flex", gap: 16, alignItems: "center" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof IconArrow>;

export const ArrowRight: Story = { args: { direction: "right", variant: "arrow", size: 14 } };
export const ArrowLeft: Story = { args: { direction: "left", variant: "arrow", size: 14 } };
export const ChevronRight: Story = { args: { direction: "right", variant: "chevron", size: 12 } };
export const Send: Story = { args: { variant: "send", size: 14 } };
