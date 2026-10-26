import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListItem } from "./ListItem";
import { List } from "../List";
import { Icon } from "../Icon";

const meta: Meta<typeof ListItem> = {
  title: "Data/ListItem",
  component: ListItem,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 560, background: "var(--bg)" }}><List title="Список"><Story /></List></div>],
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Decision: Story = {
  args: { href: "#", entity: { kind: "decision", id: "D-44" }, title: "Лимит возвратов", subtitle: "Антон Саботович · ждёт 1 д 2 ч", state: { tone: "warn", label: "Ждёт решения", pulse: true }, emphasis: "attention" },
};
export const Closed: Story = { args: { href: "#", entity: { kind: "decision", id: "D-30" }, title: "Приёмка", state: { tone: "dim", label: "Остановлено" }, emphasis: "muted" } };
export const File: Story = { args: { density: "compact", leading: <Icon name="file-ts" size={16} />, leadingTone: "mute", path: "apps/web/src/members/MembersTable.tsx", trailing: "+142 −38", href: "#", newTab: true } };
