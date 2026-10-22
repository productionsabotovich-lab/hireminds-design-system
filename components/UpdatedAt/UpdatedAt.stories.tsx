import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { UpdatedAt } from './UpdatedAt';

const meta: Meta<typeof UpdatedAt> = {
  title: 'Feedback/UpdatedAt',
  component: UpdatedAt,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UpdatedAt>;

export const SecondsAgo: Story = {
  args: { updatedAt: Date.now() - 5000 },
};

export const Loading: Story = {
  args: { updatedAt: Date.now(), loading: true },
};
