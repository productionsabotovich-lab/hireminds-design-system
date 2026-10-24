import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentForm } from "./CommentForm";

const mentions = ["Analyst", "Developer", "Reviewer", "QA"];

const meta: Meta<typeof CommentForm> = {
  title: "Forms/CommentForm",
  component: CommentForm,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: "160px 24px 24px", maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

export const Empty: Story = { args: { mentions } };
export const AllRoles: Story = { args: { mentions, value: "@" } };
export const Filtered: Story = { args: { mentions, value: "Проверьте, пожалуйста, права owner на себе: @Dev" } };
export const Sending: Story = { args: { mentions, value: "Проверьте права owner: @Developer", loading: true } };
