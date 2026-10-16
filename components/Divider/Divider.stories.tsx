import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Atoms/Divider",
  component: Divider,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Subtle: Story = { args: { weight: "subtle" } };
export const Dashed: Story = { args: { weight: "dashed" } };
export const Strong: Story = { args: { weight: "strong" } };
export const Labeled: Story = { args: { label: "или email" } };
