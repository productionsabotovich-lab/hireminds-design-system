import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentForm, type CommentMention } from "./CommentForm";

const mentions: CommentMention[] = [
  { name: "Developer", kind: "role" },
  { name: "Reviewer", kind: "role" },
  { name: "QA", kind: "role" },
  { name: "Аналитик", kind: "role" },
  { name: "Анна Петрова", kind: "person" },
];

const meta: Meta<typeof CommentForm> = {
  title: "Forms/CommentForm",
  component: CommentForm,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: "200px 24px 24px", maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CommentForm>;

export const Empty: Story = { args: { mentions } };
export const AllMentions: Story = { args: { mentions, value: "@" } };
export const Filtered: Story = { args: { mentions, value: "Проверьте, пожалуйста, права owner на себе: @Dev" } };
export const Sending: Story = { args: { mentions, value: "Проверьте права owner: @Developer", loading: true } };
export const SendError: Story = {
  args: { mentions, value: "Проверьте права owner: @Developer", error: "Не отправлено: нет связи с трекером. Повторите." },
};
export const NoMentions: Story = { args: {} };
export const Docked: Story = { args: { divider: false, raised: true, hint: "Агент ответит в конце текущего шага" } };
