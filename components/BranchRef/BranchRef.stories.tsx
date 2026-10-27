import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BranchRef } from "./BranchRef";

const meta: Meta<typeof BranchRef> = {
  title: "Data/BranchRef",
  component: BranchRef,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 300, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BranchRef>;

export const Branch: Story = { args: { name: "hm/PIL-15-project-roles", href: "#" } };
export const HeadToBase: Story = { args: { name: "hm/PIL-15-project-roles", href: "#", base: "main", baseHref: "#" } };
export const Long: Story = { args: { name: "hm/PIL-15-project-roles-and-access-matrix-for-viewers", href: "#", base: "main" } };
