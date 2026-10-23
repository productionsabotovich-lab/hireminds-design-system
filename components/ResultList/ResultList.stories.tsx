import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResultList } from "./ResultList";

const meta: Meta<typeof ResultList> = {
  title: "Data/ResultList",
  component: ResultList,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 560 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ResultList>;

const rows = [
  { kind: "file" as const, name: "MembersTable.tsx", path: "apps/web/src/members/MembersTable.tsx", stat: { additions: 142, deletions: 38 }, href: "#" },
  { kind: "file" as const, name: "roles.test.ts", path: "apps/web/src/members/roles.test.ts", stat: { additions: 118, deletions: 0 }, href: "#" },
];

export const Collapsible: Story = { args: { title: "Результат", rows, collapsible: true } };
export const Collapsed: Story = { args: { title: "Результат", rows, collapsible: true, defaultOpen: false } };
export const WithMore: Story = { args: { title: "Изменённые файлы", rows, more: 8, moreHref: "#" } };
export const Empty: Story = { args: { title: "Что получилось", rows: [], emptyText: "Сессия завершилась без изменений" } };
