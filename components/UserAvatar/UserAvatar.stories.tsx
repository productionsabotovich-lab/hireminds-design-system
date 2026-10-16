/**
 * Pattern: data/products/hireminds/design/system/patterns/user-avatar.md
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserAvatar } from "./UserAvatar";

const meta: Meta<typeof UserAvatar> = {
  title: "UI/UserAvatar",
  component: UserAvatar,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    shape: { control: "select", options: ["square", "circle"] },
    color: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  name: "Default (sm, square, accent)",
  args: { name: "Дима Новиков", size: "sm" },
};

export const AgentRoster: Story = {
  name: "Список агентов (xs, square)",
  args: { name: "Анна", size: "xs", color: "#2a2e35" },
};

export const TeamMember: Story = {
  name: "Таблица команды (md, square)",
  args: { name: "Катя Смирнова", size: "md", color: "#707880" },
};

export const ApprovalCard: Story = {
  name: "Approval card (sm, square)",
  args: { name: "Дима", size: "sm", color: "var(--accent)" },
};

export const SidebarFooter: Story = {
  name: "Sidebar footer (md, circle, accent)",
  args: { name: "Олег Петров", size: "md", shape: "circle", color: "accent" },
};

export const AccountMenu: Story = {
  name: "Account menu (lg, circle)",
  args: { name: "Антон Саботович", size: "lg", shape: "circle", color: "accent" },
};

export const TwoInitials: Story = {
  name: "Два инициала",
  args: { name: "John Doe", size: "md" },
};

export const SingleInitial: Story = {
  name: "Один инициал",
  args: { name: "Konstantin", size: "md" },
};
