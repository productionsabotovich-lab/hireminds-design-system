import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Stack } from './Stack';
import { H1 } from '../H1';
import { Lead } from '../Lead';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: { align: { control: 'select', options: ['stretch', 'start', 'center', 'end'] } },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const PageHead: Story = {
  args: {
    gap: 2,
    children: (
      <>
        <H1 size="section">Операции</H1>
        <Lead tone="mute">Запуски агентов по задачам проекта: фаза, состояние, история.</Lead>
      </>
    ),
  },
};
