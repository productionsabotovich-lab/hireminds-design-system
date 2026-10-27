import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PullRequestSummary, type PullRequestSummaryProps } from "./PullRequestSummary";
import { List } from "../List";

const pr: PullRequestSummaryProps = {
  number: 18,
  title: "Роли участников проекта: owner, admin и viewer",
  href: "#",
  state: "open",
  head: "hm/PIL-15-project-roles",
  base: "main",
  additions: 312,
  deletions: 41,
  files: 7,
  checks: { passed: 4, total: 4 },
  description: ["Три роли участника: owner, admin, viewer", "Меню участника показывает только доступные действия"],
  commit: "a4b23ec",
  author: "Developer",
};

const meta: Meta<typeof PullRequestSummary> = {
  title: "Data/PullRequestSummary",
  component: PullRequestSummary,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof PullRequestSummary>;

export const Full: Story = { args: pr };
export const Row: Story = {
  args: { ...pr, variant: "row" },
  decorators: [(Story) => <List title="Pull requests"><Story /></List>],
};
