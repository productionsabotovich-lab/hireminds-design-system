import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NavLink } from "./NavLink";

const dashIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const meta: Meta<typeof NavLink> = {
  title: "Atoms/NavLink",
  component: NavLink,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, width: 200 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: { href: "#", icon: dashIcon, children: "Dashboard" },
};

export const Active: Story = {
  args: { href: "#", active: true, icon: dashIcon, children: "Dashboard" },
};

export const WithBadge: Story = {
  args: {
    href: "#",
    icon: dashIcon,
    children: "Чаты",
    badge: { kind: "count", value: "3" },
  },
};

export const Danger: Story = {
  args: { href: "#", tone: "danger", children: "Danger zone" },
};
