import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { List } from "./List";
import { ListItem } from "../ListItem";

const meta: Meta<typeof List> = {
  title: "Data/List",
  component: List,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 560, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Decisions: Story = {
  args: {
    title: "Решения",
    count: 2,
    children: [
      <ListItem key="1" href="#" entity={{ kind: "decision", id: "D-44" }} title="Лимит возвратов" state={{ tone: "warn", label: "Ждёт решения", pulse: true }} emphasis="attention" />,
    ],
    folded: { label: "Закрытые", items: [<ListItem key="2" href="#" entity={{ kind: "decision", id: "D-34" }} title="Объём согласован" state={{ tone: "accent", label: "Утверждено" }} emphasis="muted" />] },
  },
};
export const Empty: Story = { args: { title: "Очередь агента", count: 0, emptyText: "Задач в очереди нет" } };
