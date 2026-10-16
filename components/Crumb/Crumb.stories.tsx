/**
 * Pattern: data/products/hireminds/design/system/patterns/crumb.md
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Crumb } from "./Crumb";

const meta: Meta<typeof Crumb> = {
  title: "UI/Crumb",
  component: Crumb,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Crumb>;

export const OnboardingVariant: Story = {
  name: "Onboarding (2 сегмента)",
  args: {
    items: [
      { label: "Onboarding" },
      { label: "Create workspace", active: true },
    ],
  },
};

export const SettingsVariant: Story = {
  name: "Settings (mono slug)",
  args: {
    items: [
      { label: "Settings", href: "/dashboard/settings" },
      { label: "acme-engineering", mono: true },
      { label: "General", active: true },
    ],
  },
};

export const LLMVariant: Story = {
  name: "LLM settings",
  args: {
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Подключение модели", active: true },
    ],
  },
};

export const DeepPath: Story = {
  name: "Глубокий путь (4 сегмента)",
  args: {
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/dashboard/settings" },
      { label: "acme-engineering", mono: true, href: "/dashboard/settings/workspace" },
      { label: "LLM", active: true },
    ],
  },
};
