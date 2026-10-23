import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CodeChip } from "./CodeChip";

const meta: Meta<typeof CodeChip> = {
  title: "Atoms/CodeChip",
  component: CodeChip,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, fontSize: 13.5 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CodeChip>;

export const Commit: Story = { args: { children: "a41f9c2" } };
export const Command: Story = { args: { children: "hm runner connect" } };
export const SessionLink: Story = { args: { children: "S-118", href: "#/session/S-118", title: "Сессия агента S-118" } };
export const GitHubLink: Story = {
  args: { children: "hm/PIL-15-project-roles", href: "https://github.com/productionsabotovich-lab/hireminds-pilot-app/tree/hm/PIL-15-project-roles", newTab: true },
};
