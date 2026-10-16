import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Lead } from "./Lead";

const meta: Meta<typeof Lead> = {
  title: "Atoms/Lead",
  component: Lead,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Lead>;

export const Page: Story = {
  args: {
    size: "page",
    children: "Войдите, чтобы посмотреть, что AI-команда сделала за ночь.",
  },
};

export const Hero: Story = {
  args: {
    size: "hero",
    tone: "ink-3",
    children: "BA напишет требования, Dev закодит, QA проверит — пока ты занимаешься стратегией.",
  },
};

export const Centered: Story = {
  args: {
    size: "page",
    tone: "ink-3",
    align: "center",
    children: "Мы отправили письмо с ссылкой подтверждения.",
  },
};
