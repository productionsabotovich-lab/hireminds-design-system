import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pill } from './Pill';

const meta: Meta<typeof Pill> = {
  title: 'Atoms/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['accent', 'warn', 'danger', 'dim'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: { tone: 'accent', dot: true, pulse: true, children: 'Выполняется' },
};

export const RunStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Pill tone="accent" dot pulse>Выполняется</Pill>
      <Pill tone="warn" dot>Ожидает решения</Pill>
      <Pill tone="danger" dot>Блокер</Pill>
      <Pill tone="dim">Завершён</Pill>
      <Pill tone="dim">Отменён</Pill>
    </div>
  ),
};
