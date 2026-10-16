import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepIndicator } from "./StepIndicator";

const meta: Meta<typeof StepIndicator> = {
  title: "Atoms/StepIndicator",
  component: StepIndicator,
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
type Story = StoryObj<typeof StepIndicator>;

export const Short: Story = {
  args: { current: 1, total: 3, format: "short" },
};

export const ShortWithScope: Story = {
  args: { current: 2, total: 3, format: "short", scope: "подтверждение почты" },
};

export const Verbose: Story = {
  args: { current: 2, total: 4, format: "verbose" },
};

export const VerboseWithScope: Story = {
  args: { current: 3, total: 4, format: "verbose", scope: "Bring your own key" },
};
