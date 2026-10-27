import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PlanProgress } from "./PlanProgress";

const meta: Meta<typeof PlanProgress> = {
  title: "Data/PlanProgress",
  component: PlanProgress,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 360, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PlanProgress>;

export const Six: Story = { args: { done: 3, total: 6 } };
export const Long: Story = { args: { done: 11, total: 26 } };
export const NoPlan: Story = { args: { done: null } };
