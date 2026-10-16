/**
 * Pattern: data/products/hireminds/design/system/patterns/dot.md + caption.md
 */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopbarStatus } from "./TopbarStatus";

const meta: Meta<typeof TopbarStatus> = {
  title: "UI/TopbarStatus",
  component: TopbarStatus,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TopbarStatus>;

export const SessionPending: Story = {
  args: { label: "session · pending" },
};

export const TokenVerified: Story = {
  args: { label: "reset · token verified" },
};

export const TokenExpired: Story = {
  args: { label: "reset · token expired" },
};
