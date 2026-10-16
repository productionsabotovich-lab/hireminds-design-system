import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Help } from "./Help";

const meta: Meta<typeof Help> = {
  title: "Atoms/Help",
  component: Help,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Help>;

export const Default: Story = {
  args: { children: "3–50 символов. Видят агенты и члены команды." },
};

export const Error: Story = {
  args: { tone: "error", children: "Минимум 8 символов." },
};

export const Success: Story = {
  args: { tone: "success", children: "Slug свободен." },
};
