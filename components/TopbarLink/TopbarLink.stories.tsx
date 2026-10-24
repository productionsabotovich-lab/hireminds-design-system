import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopbarLink } from "./TopbarLink";

const meta: Meta<typeof TopbarLink> = {
  title: "Navigation/TopbarLink",
  component: TopbarLink,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, background: "var(--surface)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TopbarLink>;

export const Decisions: Story = { args: { href: "#", label: "Мои решения", shortLabel: "Решения", icon: "inbox", badge: { kind: "count", value: 4 } } };
export const NoDecisions: Story = { args: { href: "#", label: "Мои решения", icon: "inbox", badge: { kind: "count", value: 0 } } };
export const Current: Story = { args: { href: "#", label: "Мои решения", icon: "inbox", badge: { kind: "count", value: 4 }, current: true } };
export const Soon: Story = { args: { label: "Моя команда", badge: { kind: "soon" } } };
