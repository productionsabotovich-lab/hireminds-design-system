import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExternalLink } from "./ExternalLink";

const meta: Meta<typeof ExternalLink> = {
  title: "Atoms/ExternalLink",
  component: ExternalLink,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExternalLink>;

export const Footer: Story = {
  args: { variant: "footer", href: "#", children: "status" },
};

export const Inline: Story = {
  args: { variant: "inline", href: "#", children: "Условиями" },
};

export const Action: Story = {
  args: {
    variant: "action",
    href: "https://console.anthropic.com",
    newTab: true,
    children: "Получить на console.anthropic.com",
  },
};
