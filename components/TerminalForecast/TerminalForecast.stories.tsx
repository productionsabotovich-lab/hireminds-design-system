import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TerminalForecast } from "./TerminalForecast";

const meta = {
  title: "Atoms/TerminalForecast",
  component: TerminalForecast,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 280, width: "100%" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TerminalForecast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Minimal: Story = {
  name: "минимальный",
  args: {
    title: "что произойдёт",
    items: [
      { text: "workspace создан" },
      { text: "6 агентов поднимаются" },
      { text: "первая задача готова" },
    ],
  },
};

export const WithAccentAndSubtitle: Story = {
  name: "с заголовком и акцентом",
  args: {
    title: "что произойдёт",
    subtitle: "после",
    items: [
      { text: "workspace создан" },
      { text: "6 агентов поднимаются" },
      { text: "первая задача · Анна", accent: true },
      { text: "«опишите цель проекта»" },
    ],
  },
};

export const WithFooter: Story = {
  name: "с footer-таймингом",
  args: {
    title: "что произойдёт",
    subtitle: "после",
    items: [
      { text: "workspace создан" },
      { text: "6 агентов поднимаются" },
      { text: "первая задача · Анна", accent: true },
      { text: "«опишите цель проекта»" },
    ],
    footer: { label: "tick", value: "→ 60s" },
  },
};

export const HiringPreview: Story = {
  name: "найм агента — превью",
  args: {
    title: "после найма",
    items: [
      { text: "агент добавлен в команду" },
      { text: "первое задание через 60s", accent: true },
      { text: "уведомление на email" },
    ],
    footer: { label: "планировщик", value: "→ каждый час" },
  },
};

export const ApprovalPreview: Story = {
  name: "approval — превью последствий",
  args: {
    title: "если одобрить",
    subtitle: "действие",
    items: [
      { text: "задача запускается сразу" },
      { text: "агент получает доступ к API", accent: true },
      { text: "результат через ~5 мин" },
    ],
  },
};
