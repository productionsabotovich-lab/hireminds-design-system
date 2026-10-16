import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PasswordEyeToggle } from './PasswordEyeToggle';

const meta = {
  title: 'Atoms/PasswordEyeToggle',
  component: PasswordEyeToggle,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 40, height: 36 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordEyeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hidden: Story = {
  args: { visible: false, onToggle: () => {} },
};

export const Visible: Story = {
  args: { visible: true, onToggle: () => {} },
};
