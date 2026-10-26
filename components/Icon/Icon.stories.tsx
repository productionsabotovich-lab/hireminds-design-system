import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, display: "flex", gap: 16, alignItems: "center", color: "var(--mute)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const PullRequest: Story = { args: { name: "pull-request" } };
export const Merged: Story = { args: { name: "pull-request-merged" } };
export const FileTs: Story = { args: { name: "file-ts" } };
export const FileTest: Story = { args: { name: "file-test", size: 14 } };
export const WithTitle: Story = { args: { name: "branch", title: "Ветка" } };
export const Session: Story = { args: { name: "session" } };
export const Decision: Story = { args: { name: "decision" } };
export const Tracker: Story = { args: { name: "tracker" } };
export const Epic: Story = { args: { name: "epic" } };
export const Queue: Story = { args: { name: "queue" } };
export const Alert: Story = { args: { name: "alert", title: "Внимание" } };
