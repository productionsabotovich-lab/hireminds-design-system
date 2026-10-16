import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { H1 } from "./H1";

const meta: Meta<typeof H1> = {
  title: "Atoms/H1",
  component: H1,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof H1>;

export const Display: Story = {
  args: { size: "display", children: "С возвращением." },
};

export const DisplayWithEm: Story = {
  args: {
    size: "display",
    children: (
      <>
        Готово. Заходим в <em>Hireminds</em>.
      </>
    ),
  },
};

export const Hero: Story = {
  args: {
    size: "hero",
    children: (
      <>
        Бывает. <em>Восстановим</em> доступ к&nbsp;команде.
      </>
    ),
  },
};

export const Section: Story = {
  args: { size: "section", children: "Acme Engineering" },
};

export const Centered: Story = {
  args: { size: "display", align: "center", children: "Подтверди свой email." },
};
