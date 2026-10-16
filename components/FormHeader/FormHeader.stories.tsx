import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormHeader } from "./FormHeader";

const meta: Meta<typeof FormHeader> = {
  title: "Atoms/FormHeader",
  component: FormHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 32, maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormHeader>;

export const WithKickerAndLead: Story = {
  args: {
    kicker: "Recover password",
    heading: "Пришлём ссылку для сброса.",
    lead: "Если этот email зарегистрирован, письмо придёт в течение минуты.",
  },
};

export const HeadingOnly: Story = {
  args: {
    heading: "С возвращением.",
    lead: "Войди в свой аккаунт Hireminds.",
  },
};

export const WithKickerNoLead: Story = {
  args: {
    kicker: "Reset password · step 3 / 3",
    heading: "Задай новый пароль.",
  },
};

export const SettingsPage: Story = {
  args: {
    kicker: "General",
    heading: "Настройки аккаунта",
    lead: "Имя, email, язык интерфейса.",
  },
};
