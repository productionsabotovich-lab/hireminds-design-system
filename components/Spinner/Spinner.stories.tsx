import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 18,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <Spinner size={14} label="Small" />
      <Spinner size={18} label="Medium" />
      <Spinner size={24} label="Large" />
      <Spinner size={32} label="XLarge" />
    </div>
  ),
};

export const ColoredSpinners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <Spinner size={20} color="var(--accent)" label="Accent" />
      <Spinner size={20} color="var(--danger)" label="Danger" />
      <Spinner size={20} color="var(--warn)" label="Warn" />
      <Spinner size={20} color="var(--mute)" label="Muted" />
    </div>
  ),
};
