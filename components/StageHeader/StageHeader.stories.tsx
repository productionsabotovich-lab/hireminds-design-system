import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StageHeader } from "./StageHeader";

const meta: Meta<typeof StageHeader> = {
  title: "Atoms/StageHeader",
  component: StageHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: "var(--bg-2)", maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StageHeader>;

export const Aside: Story = {
  args: {
    variant: "aside",
    kicker: "забыли пароль · 1 минута",
    heading: (
      <>
        Бывает. <em>Восстановим</em> доступ к&nbsp;команде.
      </>
    ),
    lead: "Введи email — пришлём ссылку для входа.",
  },
};

export const AsideNoLead: Story = {
  args: {
    variant: "aside",
    kicker: "регистрация",
    heading: (
      <>
        Добро пожаловать в <em>Hireminds</em>.
      </>
    ),
  },
};

export const Hero: Story = {
  args: {
    variant: "hero",
    kicker: "Шаг 1 из 1 · твой ход",
    heading: (
      <>
        Найми первого <em>агента</em>.
      </>
    ),
    lead: "BA напишет требования, дизайнер набросает макет.",
  },
};
