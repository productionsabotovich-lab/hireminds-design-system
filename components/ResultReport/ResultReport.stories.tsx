import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ResultReport, type ReportBlock } from "./ResultReport";

const blocks: ReportBlock[] = [
  { type: "text", text: "Предлагаю очередь задач агентов на Postgres: отдельный сервис не нужен." },
  { type: "compare", before: "опрос таблицы раз в 5 с", after: "SKIP LOCKED, задача берётся одним раннером" },
  {
    type: "table",
    title: "Сравнение вариантов",
    columns: [{ label: "Вариант" }, { label: "Задержка, мс", num: true }, { label: "₽ в месяц", num: true }, { label: "Поддержка" }],
    rows: [
      { cells: ["Postgres", "120", "0", "уже в стеке"], pick: true },
      { cells: ["Redis Streams", "15", "4 800", "новый сервис"] },
    ],
  },
  {
    type: "chart",
    label: "Задержка по нагрузке",
    x: ["10", "100", "400"],
    unit: "мс",
    xLabel: "задач в минуту",
    series: [
      { label: "Postgres", tone: "accent", values: [40, 90, 180] },
      { label: "Redis Streams", tone: "warn", values: [10, 14, 20] },
    ],
  },
];

const meta: Meta<typeof ResultReport> = {
  title: "Data/ResultReport",
  component: ResultReport,
  tags: ["autodocs"],
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 640, background: "var(--bg)" }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ResultReport>;

export const Card: Story = { args: { blocks, caption: "Архитектор · 12 мин назад" } };
export const Clamp: Story = { args: { blocks, clamp: true } };
export const Interim: Story = { args: { blocks: blocks.slice(0, 1), interim: true } };
export const Bare: Story = { args: { blocks, bare: true } };
