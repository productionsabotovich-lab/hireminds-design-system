import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageFooter } from "./PageFooter";

const links = [
  { label: "status", href: "#" },
  { label: "docs", href: "#" },
  { label: "security", href: "#" },
];

const meta: Meta<typeof PageFooter> = {
  title: "Atoms/PageFooter",
  component: PageFooter,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 480 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PageFooter>;

export const Between: Story = {
  args: { layout: "between", brand: { version: "S2", year: 2026 }, links },
};

export const Center: Story = {
  args: { layout: "center", brand: { version: "S2", year: 2026 }, links },
};

export const Inline: Story = {
  args: {
    layout: "inline",
    brand: { version: "S2", year: 2026 },
    links: [
      { label: "status", href: "#" },
      { label: "security", href: "#" },
      { label: "support", href: "#" },
    ],
  },
};
