import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Body } from "./Body";

const meta: Meta<typeof Body> = {
  title: "Atoms/Body",
  component: Body,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Body>;

export const Base: Story = {
  args: { size: "base", children: "Описание шага в checklist." },
};

export const Small: Story = {
  args: { size: "small", tone: "ink-3", children: "Где живёт ваш ключ — только у вас." },
};
