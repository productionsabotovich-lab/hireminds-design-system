import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['mini', 'block'] } },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoRuns: Story = {
  args: { title: 'Запусков нет', children: 'Назначьте issue на агента в Linear.' },
};

export const NoProjects: Story = {
  args: { title: 'Проектов нет', children: <>Подключите проект командой <code>hm project apply</code>.</> },
};

export const Mini: Story = {
  args: { variant: 'mini', children: 'Решений нет' },
};
