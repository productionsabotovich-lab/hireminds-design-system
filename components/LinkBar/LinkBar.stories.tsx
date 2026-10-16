import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkBar } from "./LinkBar";

const links = [
  { label: "status", href: "#" },
  { label: "docs", href: "#" },
  { label: "security", href: "#" },
];

const meta: Meta<typeof LinkBar> = {
  title: "Atoms/LinkBar",
  component: LinkBar,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof LinkBar>;

export const Plain: Story = { args: { links, separator: "plain" } };
export const Dotted: Story = { args: { links, separator: "dotted" } };
