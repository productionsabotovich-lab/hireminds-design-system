import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResultRow } from "./ResultRow";
import { Pill } from "../Pill";

const meta: Meta<typeof ResultRow> = {
  title: "Data/ResultRow",
  component: ResultRow,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 520, background: "var(--surface)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ResultRow>;

export const PullRequest: Story = { args: { kind: "pr", name: "PR #21 · Роли участников проекта", meta: <Pill>открыт</Pill>, href: "#" } };
export const Merged: Story = { args: { kind: "pr", name: "PR #21 · Роли участников проекта", merged: true, meta: <Pill tone="accent">влит</Pill>, href: "#" } };
export const File: Story = { args: { kind: "file", name: "MembersTable.tsx", path: "apps/web/src/members/MembersTable.tsx", stat: { additions: 142, deletions: 38 }, href: "#" } };
export const FileMeta: Story = { args: { kind: "file", name: "PIL-15-roles.md", path: "docs/specs/PIL-15-roles.md", meta: "Аналитик · ред. 2" } };
export const Report: Story = { args: { kind: "report", name: "Отчёт QA", meta: "7 из 9", href: "#" } };
